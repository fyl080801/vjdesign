#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

yarn docs:build

mkdir docs/.vuepress/dist/example

cp -r example docs/.vuepress/dist

cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'polish: docs'
git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-pages
