#!/bin/bash

set -x
rm -rf ./build || true
mkdir ./build
os_name=$(node -e "console.log(process.platform)")
if [ "$os_name" = "darwin" ]; then
  CPPFLAGS=-I/usr/local/opt/openssl/include LDFLAGS=-L/usr/local/opt/openssl/lib yarn install --frozen-lockfile --dev
else
  yarn install --frozen-lockfile --dev
fi
yarn babel src -d build
# Start copy component to build folder.
cp -r ./scripts build/
cp package.json yarn.lock build/
