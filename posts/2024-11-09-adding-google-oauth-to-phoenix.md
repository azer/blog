---
layout: blog-post.njk
title: "Adding Google OAuth to Phoenix"
createdAt: "2024-11-09T21:19:00.000Z"
---

Recently added Google authentication to an app I'm building. Writing this down as I don't want to remember all the steps next time - Stack Overflow threads pointing to outdated Google Console menus and several other obstacles made this seemingly simple feature frustrating.

Here's how to add Google OAuth to a Phoenix app, step by step.

## Step 1. Setting up OAuth Credentials

First, we need OAuth2 credentials. Grab your Client ID and Client Secret by following these steps:

* Visit [console.cloud.google.com](https://console.cloud.google.com)
* Create a project
* Head to "APIs & Services" > "OAuth consent screen".
* Fill in required fields - app name and developer contact info
* Create credentials by going to "Credentials" > "Create Credentials" > "OAuth Client ID".
* Add authorized redirect URIs: `http://localhost:4000/auth/google/callback` and `https://yourdomain.com/auth/google/callback`

## Step 2. Configuration

Add OAuth dependencies to mix.exs:

```ex
{:ueberauth, "~> 0.10"},
{:ueberauth_google, "~> 0.10"}
```

Install new dependencies:

```bash
$ mix deps.get
```

Configure OAuth settings in `config/config.exs`:

```ex
config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, [
      default_scope: "email profile",
      prompt: "select_account"
    ]}
  ]

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")
```

Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` into your prod / dev environment. You might want to move the configuration to `config/runtime.exs` if you like to load `.env` file first;

```ex
# Install if missing from https://hex.pm/packages/dotenv_parser
if config_env() == :dev do
  DotenvParser.load_file(".env")
end
```

## Step 3. Database & Schema

Now let's create a migration add OAuth fields to our users table:

```bash
$ mix ecto.gen.migration add_oauth_fields_to_users
```

We'll store user's name, avatar URL, OAuth provider name, and access token. Also make the password field optional as OAuth users won't have passwords:

```ex
defmodule MyApp.Repo.Migrations.AddOAuthFieldsToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :name, :string
      add :avatar_url, :string
      add :provider, :string
      add :token, :string
      modify :hashed_password, :string, null: true  # Allow OAuth users without password
    end
  end
end
```

Run the migration:

```bash
$ mix ecto.migrate
```

And update the User schema in `lib/myapp/accounts/user.ex`:

```ex
schema "users" do
  field :email, :string
  field :password, :string, virtual: true, redact: true
  field :hashed_password, :string, redact: true
  field :confirmed_at, :naive_datetime
  field :name, :string
  field :provider, :string
  field :token, :string
  field :avatar_url, :string

  timestamps()
end
```

Add OAuth changeset - this handles user creation and updates when they sign in with Google:

```ex
def oauth_changeset(user, attrs) do
  user
  |> cast(attrs, [:email, :name, :provider, :token, :avatar_url])
  |> validate_required([:email, :provider])
  |> validate_email([])
  |> unique_constraint(:email)
  |> put_change(:confirmed_at, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second))
end
```

## Step 4. Routing & UI

Add routes in `lib/app_web/router.ex`:


```ex
scope "/auth", MyAppWeb do
  pipe_through [:browser, :redirect_if_user_is_authenticated]

  get "/:provider", AuthController, :request
  get "/:provider/callback", AuthController, :callback
end
```

Create the auth controller in `lib/myapp_web/controllers/auth_controller.ex`:

```ex
defmodule MyAppWeb.AuthController do
  use MyAppWeb, :controller
  plug Ueberauth

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    user_params = %{
      email: auth.info.email,
      name: auth.info.name,
      provider: "google",
      avatar_url: auth.info.image,
      token: auth.credentials.token
    }

    case Accounts.get_or_create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Welcome!")
        |> UserAuth.log_in_user(user)

      {:error, _reason} ->
        conn
        |> put_flash(:error, "Authentication failed")
        |> redirect(to: ~p"/login")
    end
  end
end
```

Finally, we can now add the Google sign in button to `lib/myapp_web/controllers/user_session_html/new.html.heex`;

```ex
  <a
    href="/auth/google"
    class="flex justify-center relative text-center no-underline bg-[#1e2229] text-[#fff] transition mt-[10px] px-[10px] py-[15px] border-[0] w-full rounded-[7px] text-[16px] border-[1px] border-[rgba(0,0,0,.1)] shadow font-semibold cursor-pointer hover:-translate-y-[2px]"
  >
    <div class="w-[20px] h-[20px] mr-[12px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 533.5 544.3"
        width="100%"
        height="100%"
        style="display:inline-flex; align-items:center;"
      >
        <path
          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
          fill="#fff"
        >
        </path>
        <path
          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
          fill="#fff"
        >
        </path>
        <path
          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
          fill="#fff"
        >
        </path>
        <path
          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
          fill="#fff"
        >
        </path>
      </svg>
    </div>
    <label class="cursor-pointer">Continue with Google</label>
  </a>
```

## Step 5. Email Notification

Let's also notify users when they sign in with Google for the first time. First, add new notification method to `lib/myapp/accounts/user_notifier.ex`:

```ex
def deliver_oauth_welcome_message(user) do
  html_body = """
  <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="font-size: 24px; color: #1a1a1a;">Welcome to MyApp! ✨</h1>
    <p style="color: #333; line-height: 1.5;">Thanks for signing up with Google. Your account is verified and ready to go.</p>
    <p style="margin: 25px 0;">
      <a href="https://myapp.com" style="background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Start Using MyApp</a>
    </p>
    <p style="color: #666; font-size: 14px;">Or visit: https://myapp.com</p>
    <p style="color: #333; margin-top: 30px;">Best,<br>MyApp Team</p>
  </div>
  """

  text_body = """
  Welcome to MyApp! ✨

  Thanks for signing up with Google. Your account is verified and ready to go.

  Start using MyApp at: https://myapp.com

  Best,
  MyApp Team
  """

  deliver(user.email, "Welcome to MyApp! ✨", html_body, text_body)
end
```

Then update the auth controller (`lib/myapp_web/controllers/auth_controller.ex`) to send email when user signs up:

```ex
  case Accounts.get_or_create_user(user_params) do
    {:ok, user} ->

      # Send email if the user was just created
      if just_created?(user) do
        Accounts.UserNotifier.deliver_oauth_welcome_message(user)
      end

      ...
  end
```

Don't forget adding a helper function to check if the user was just created:

```ex
defp just_created?(user) do
  case user.inserted_at do
    nil -> true
    created_at ->
      NaiveDateTime.diff(NaiveDateTime.utc_now(), created_at) < 5  # Within last 5 seconds
  end
end
```

That's all needed for Google authentication. The setup above handles both new and returning users, stores their name and profile picture, and automatically confirms their email.
