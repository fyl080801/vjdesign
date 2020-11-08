#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

yarn docs:build

cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'polish: docs'
git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-pages

cd -

yarn demo:build

cd demo

git init
git add -A
git commit -m 'polish: demo'
git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REF}" master:gh-demo
git push --force --quiet "https://${GITEE_TOKEN}@${GITEE_REF}" master:gh-demo

cd -
