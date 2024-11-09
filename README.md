# Homepage

Personal website built with [Lume](https://lume.land), a static site generator for Deno.

## Quick Start

```bash
# Start development server
deno task serve

# Build the site
deno task build
```

## Creating & Managing Posts

### Create a New Post

1. Run the post generator:
   ```bash
   ./new-post.sh
   ```
2. Enter the post title when prompted
3. The script will create a new markdown file in `posts/` with the correct frontmatter

### Post Structure

Posts are stored in `posts/` directory as markdown files with this format:

```markdown
---
layout: blog-post.njk
title: "Your Post Title"
createdAt: "2024-01-01T12:00:00.000Z"
---

Your content here...
```

### Writing Posts

- Write your content in Markdown
- For code blocks, use triple backticks with language name:
  ````markdown
  ```python
  def hello():
      print("Hello World")
  ```
  ````
- Images from `static/` directory can be referenced directly:
  ```markdown
  ![Alt text](/static/image.jpg)
  ```

### Managing Drafts

Store work-in-progress posts in the `drafts/` directory. They'll be built but not included in the main blog index.

## Development

```bash
# Install dependencies
deno task lume

# Start dev server with hot reload
deno task serve

# Build for production
deno task build
```

The built site will be in the `_site` directory.
