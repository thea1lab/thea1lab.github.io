#!/bin/bash
set -euo pipefail

# Commit and push source changes on the current branch when needed.
# If the worktree is already clean, still continue with build + gh-pages deploy.
git add -A
if ! git diff --cached --quiet --ignore-submodules --; then
  git commit -S -m "Autonomous deploy $(date)"
  git push
else
  echo "No source changes to commit. Continuing with build and gh-pages deploy."
fi

# Build the site from a clean output directory so removed pages are not redeployed
hugo -D --buildFuture --cleanDestinationDir

# Deploy public/ to gh-pages using a temporary orphan approach
cd public
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy $(date)"
git push -f "$(cd .. && git remote get-url origin)" gh-pages
cd ..
rm -rf public/.git
