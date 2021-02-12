hugo -D
git add .
git commit -S -m "Autonomous deploy `date`"
git push
git subtree push --prefix public origin gh-pages
