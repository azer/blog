---
layout: blog-post.njk
title: "Deploying Phoenix with Kamal"
createdAt: "2023-11-07T00:00:00.000Z"
---

Recently I've moved two Elixir/Phoenix apps, [sway](https://sway.so) and [kaynak](https://kaynak.app) to Hetzner, a Germany-based hosting provider. These apps not only have got better hardware, they now cost much less with simple & consistent pricing. [Kamal](https://kamal-deploy.org) plays a key role in this, it brings the developer experience of fancy cloud services (like [fly.io](https://fly.io)) to any server you own.

I hope this blog post will be useful for others who want to try Kamal for deploying Phoenix apps.

## First steps

Let's install Kamal as a first step and initialize it in your project repository:

```bash
$ gem install kamal
$ kamal version # confirm it's installed
```

Now initialize kamal in your project:

```bash
$ kamal init
```

This should create bunch of files (e.g `config/deploy.yml`) for configuring kamal in your project.

## Docker Image

If the project doesn't have a Dockerfile yet, create one by running:

```bash
$ mix phx.gen.release --docker
```

### Builder Image

If you don't need to compile NPM assets, you can skip to runner image section.

To make sure NPM assets are compiled, make sure NPM is installed in the builder image by adding `npm` to the `apt install` line:

```Dockerfile
RUN apt-get update -y && apt-get install -y build-essential git openssl libncurses5 locales curl npm \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*
```

Add compile command before `mix assets.deploy` call:

```Docker
RUN npm --prefix ./assets ci --progress=false --no-audit --loglevel=error
```

### Runner Image

Make sure `curl` is installed in the runner image:

```Dockerfile
RUN apt-get update -y && apt-get install -y libstdc++6 openssl libncurses5 locales curl \
  && apt-get clean && rm -f /var/lib/apt/lists/*_*
```

Also in the runner image section, expose port 3000:

```Dockerfile
EXPOSE 3000
```

If the project already has Dockerfile, make sure you don't have any leftover instructions. e.g Fly.io instructions

## Configure .env

Open `.env` and add these lines;

```
SECRET_KEY_BASE=
KAMAL_REGISTRY_PASSWORD=
DATABASE_URL=
PHX_HOST=
```

And add corresponding values;

* **SECRET_KEY_BASE:** Run `mix phx.gen.secret` to generate the secret key needed.
* **KAMAL_REGISTRY_PASSWORD**: Open up [Github - New Token](https://github.com/settings/tokens/new) page, create a new token by selecting the `write:packages` scope. Copy generated token here.
* **DATABASE_URL:** Connection string for the database. Make sure setting protocol as `ecto`, not `postgres` or `mysql`.
* **PHX_HOST:** Hostname for production runtime.

## Configure deploy.yml

Open up `config/deploy.yml` and make following changes:

* service: name of your app
* image: <github user>/<github repo>

Add IP address of the server that you want to deploy to:

```yaml
servers:
  web:
    hosts:
      - <ip address>
```

Registry should be pointed to Github:

```yaml
registry:
  server: ghcr.io
  username: <github user>
```

Specify port and secrets in the env variables:

```yaml
env:
   clear:
     PORT: 3000
   secret:
     - DATABASE_URL
     - SECRET_KEY_BASE
     - PHX_HOST
```

I build the image in arm64 and also deploy to arm64, so disabled `multiarch`:

```yaml
builder:
   multiarch: false
```

## Health-check

Kamal needs an health check endpoint to ensure deploy is whether if successful. I've found this code in [Baptiste Chaleil's blog](https://mrdotb.com/posts/deploy-phoenix-with-kamal) straightforward;

Create health check plugin:

```elixir
defmodule BlogexWeb.HealthCheckPlug do
  @moduledoc """
  A Plug to return a health check on `/up`
  """

  import Plug.Conn

  @behaviour Plug

  def init(opts), do: opts

  def call(%{path_info: ["up"]} = conn, _opts) do
    conn
    |> send_resp(200, "ok")
    |> halt()
  end

  def call(conn, _opts), do: conn
end
```

And enable it at `lib/myapp_web/endpoint.ex`:

```elixir
  plug BlogexWeb.HealthCheckPlug
```

Test if it works locally by hitting the `/up` endpoint:

```elixir
curl -v localhost:4000/up
```

## Deploy

Bootstrap kamal in the target servers:

```bash
$ kamal server bootstrap
```

Push environment config:

```bash
$ kamal env push
```

And deploy:

```bash
$ kamal deploy
```

## SSL

Make sure Let's Encrypt is installed in your servers by;

```bash
$ apt install certbot
$ mkdir -p /letsencrypt && touch /letsencrypt/acme.json && chmod 600 /letsencrypt/acme.json
```

And add Traefik configuration for SSL by opening `config/deploy.yml` and adding these lines:

```yaml
servers:
  web:
    hosts:
      - <ip address>
    labels:
      traefik.http.routers.kiqr_cloud.rule: Host(`kaynak.app`)
      traefik.http.routers.kiqr_cloud_secure.entrypoints: websecure
      traefik.http.routers.kiqr_cloud_secure.rule: Host(`kaynak.app`)
      traefik.http.routers.kiqr_cloud_secure.tls: true
      traefik.http.routers.kiqr_cloud_secure.tls.certresolver: letsencrypt
```

And, in the later sections of `config/deploy.yml`:

```yaml

traefik:
  options:
    publish:
      - "443:443"
    volume:
      - "/letsencrypt/acme.json:/letsencrypt/acme.json"
  args:
    entryPoints.web.address: ":80"
    entryPoints.websecure.address: ":443"
    certificatesResolvers.letsencrypt.acme.email: "your email"
    certificatesResolvers.letsencrypt.acme.storage: "/letsencrypt/acme.json"
    certificatesResolvers.letsencrypt.acme.httpchallenge: true
    certificatesResolvers.letsencrypt.acme.httpchallenge.entrypoint: web
```

Open `config/runtime.ex` and enable SSL:

```elixir
  config :myapp, MyApp.Repo,
    ssl: true,
    ssl_opts: [
      verify: :verify_none
    ],
```

Finally, reboot `traefik` after adding SSL configuration:

```bash
$ kamal traefik reboot
```

## Useful Commands

Check logs:

```elixir
$ kamal app logs
```

List containers:

```bash
$ kamal app containers
```

Remote Elixir shell:

```bash
$ kamal app exec -i --reuse '/app/bin/<app name> remote'
```

Run `migrate` command remotely:

```bash
$ kamal app exec -i --reuse '/app/bin/<app name> remote'
Sway.Release.migrate
```

Rollback:

```bash
$ kamal rollback [git hash]
```
