#!/usr/bin/env bash
# Check internal links in built Quartz HTML files.
# Resolves relative links to .html files or index.html in dirs.
# Usage: bash scripts/check-links.sh [public]
set -euo pipefail

PUBDIR="${1:-public}"
ERRORS=0
CHECKED=0

while IFS=$'\t' read -r file href; do
  case "$href" in
    http://*|https://*|mailto:*|tel:*|javascript:*|'#'*|'') continue ;;
  esac
  href="${href%%#*}"
  [ -z "$href" ] && continue
  dir="$(dirname "$file")"
  target="$(cd "$dir" 2>/dev/null && realpath --quiet "$href" 2>/dev/null || true)"
  if [ -f "$target" ] || [ -f "${target}.html" ] || { [ -d "$target" ] && [ -f "${target}/index.html" ]; }; then
    CHECKED=$((CHECKED + 1))
  else
    echo "BROKEN: $href (from ${file#$PUBDIR/})"
    ERRORS=$((ERRORS + 1))
  fi
done < <(
  find "$PUBDIR" -name '*.html' | while IFS= read -r f; do
    grep -ohE 'href="[^"]*"' "$f" | sed 's/.*href="//;s/"$//' | while IFS= read -r h; do
      printf '%s\t%s\n' "$f" "$h"
    done
  done
)

echo "---"
echo "Checked: $CHECKED, Broken: $ERRORS"
[ "$ERRORS" -eq 0 ]