#!/bin/bash

git add conf/\*.conf
git commit -m "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")"

if [[ $1 != "--no-push" ]]; then
  git push
fi
