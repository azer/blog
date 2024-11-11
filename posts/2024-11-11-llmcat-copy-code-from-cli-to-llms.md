---
layout: blog-post.njk
title: "llmcat - Copy Code from CLI to LLMs"
createdAt: "2024-11-11T17:56:00.000Z"
---

I frequently need to feed parts of my codebase to LLMs. Manually going into the directories, finding the files, and preparing them in the right format for LLMs was taking me away from what I really want to do.

I built [llmcat](https://github.com/azer/llmcat) to automate this part. It reads files or directories, formats them properly and copies to clipboard as one large Markdown document, respecting `.gitignore`.

It's very simple to use.

```bash
$ llmcat . # Copies entire directory
$ llmcat foo/bar.txt # Copies single file
```

When you run it, the content will be copied in following format:

```md
## File: foo/bar.txt
---
[file contents]

...
```

## Interactive Mode

Suppose you work in a large repository and want to copy multiple files/directories. Instead of going into each directory and formatting/copying/pasting manually, you can use llmcat's interactive mode to fuzzy search and copy files.

Just run llmcat without parameters to open interactive mode:

```bash
$ llmcat
```

And press `tab` to select files & directories, like below:

![llmcat 3](https://github.com/user-attachments/assets/d53ee548-8900-4b1a-bbc7-69a0c01b72e8)

When done, press enter and everything will be copied in following format:

```markdown
## File: assets/js/state/config.js
---
[content]

## File: README.md
---
[content]

...
```

## Using with LLM CLI

You can pipe llmcat's output to Simon Willison's [LLM](https://github.com/simonw/llm) tool by running it in print mode (`-p, --print`):

```bash
$ llmcat -p assets/js/state | llm "explain this code"
```

You can pipe output in interactive mode:

```bash
$ llmcat -p | llm "Fix typing issues"
```

## Install

llmcat is just a bash script that works in both OSX and Linux. To install:

```bash
# Download the script
curl -o llmcat https://raw.githubusercontent.com/azer/llmcat/main/llmcat

# Make it executable
chmod +x llmcat

# Move to your PATH
sudo mv llmcat /usr/local/bin/
```

You'll need following dependencies (`brew install fzf bat` or `apt install fzf bat`):

* [fzf](https://github.com/junegunn/fzf) for fuzzy searching files
* [bat](https://github.com/sharkdp/bat) for preview panel
* OSX: uses pbcopy for clipboard (built-in)
* Linux: needs xclip or xsel for clipboard (apt install xclip)

Check out [github.com/azer/llmcat](https://github.com/azer/llmcat) for more details about available options.

Hope it's useful! Let me know how your experience goes: [@azerkoculu](https://twitter.com/azerkoculu)
