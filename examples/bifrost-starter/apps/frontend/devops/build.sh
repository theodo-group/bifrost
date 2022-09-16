#!/usr/bin/env bash
# convience script to build the frontend application docker image, must be
# ran from root diretory like so: `./apps/frontend/devops/build.sh`
set -euo pipefail
IFS=$'\n\t'

function clean_up() {
  if [ -f .dockerignore ]; then
    rm .dockerignore
  fi

}

cp apps/frontend/devops/.dockerignore ./
trap clean_up err exit
docker build -f apps/frontend/devops/Dockerfile .
