hugo -D
git add .
git commit -m "Autonomous deploy `date`"
git push
git subtree push --prefix public origin gh-pages
