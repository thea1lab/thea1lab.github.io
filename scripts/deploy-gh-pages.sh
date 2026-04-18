#!/bin/bash
set -e

# Commit and push source changes on master
git add .
git commit -S -m "Autonomous deploy $(date)"
git push

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
