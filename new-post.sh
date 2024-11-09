#!/usr/bin/env bash

# Function to convert string to kebab case
to_kebab_case() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-zA-Z0-9]+/-/g' | sed -E 's/^-+|-+$//g'
}

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Prompt for title
read -p "Enter post title: " title

# Get current date in YYYY-MM-DD format
current_date=$(date +%Y-%m-%d)

# Prompt for date with current date as default
read -p "Enter date (YYYY-MM-DD) [$current_date]: " post_date
post_date=${post_date:-$current_date}

# Get current time in HH:MM format
current_time=$(date +%H:%M)

# Prompt for time with current time as default
read -p "Enter time (HH:MM) [$current_time]: " post_time
post_time=${post_time:-$current_time}

# Create filename
kebab_title=$(to_kebab_case "$title")
filename="${post_date}-${kebab_title}.md"

# Create full filepath
posts_dir="${SCRIPT_DIR}/posts"
filepath="${posts_dir}/${filename}"

# Ensure posts directory exists
mkdir -p "$posts_dir"

# Create ISO 8601 datetime
iso_datetime="${post_date}T${post_time}:00.000Z"

# Create the post file
cat > "$filepath" << EOF
---
layout: blog-post.njk
title: "${title}"
createdAt: "${iso_datetime}"
---

EOF

echo "Created new post: $filepath"
