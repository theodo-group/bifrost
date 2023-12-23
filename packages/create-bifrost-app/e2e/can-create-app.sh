#!/usr/bin/env bash
# test that the built executable can be used to bootstrap a bifrost app
set -euo pipefail
IFS=$'\n\t'

if [[ ! -f ./dist/index.js ]];then
	echo 'could not find dist/index.js, did you build the package?'
	echo "working in: $(pwd)"
	exit 1
fi
# check node

set +e
command -v node >/dev/null
result="$?"
set -e
if [[ "$result" -gt 0 ]];then
	echo 'nodejs not found'
  exit 1
fi
set +e
command -v pnpm >/dev/null
result="$?"
set -e
if [[ "$result" -gt 0 ]];then
	echo 'pnpm not found'
  exit 1
fi


rm -rf sandbox
mkdir sandbox
cd sandbox

node ../dist/index.js
cd app

pnpm run test

echo 'Sucessfully initialized project'
