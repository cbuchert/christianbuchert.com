#!/bin/sh
set -e

NAME="$1"

if [ -z "$NAME" ]; then
  echo "Usage: $0 <name>"
  echo "Example: $0 my-cool-article"
  exit 1
fi

FILE="src/content/links/${NAME}.md"

if [ -f "$FILE" ]; then
  echo "Link '${NAME}' already exists: ${FILE}"
else
  cat > "$FILE" <<EOF
---
title: ""
url: ""
dateAdded: $(date +%Y-%m-%d)
tags: []
type: ""
---

EOF
  echo "Created ${FILE}"
fi
