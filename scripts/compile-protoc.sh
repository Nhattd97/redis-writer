#!/bin/bash

rootDir="`pwd`"

# Compile submodule schema to rootDir/src/schema
cd $rootDir/schema
rm -rf ../src/schema &>/dev/null || true
yarn install
yarn compile ../src/schema

# Compile submodule kobiton-dc to rootDir/src/kobiton-dc
cd $rootDir/kobiton-dc
yarn install
yarn compile
rm -rf ../src/kobiton-dc &> /dev/null || true
cp -r ./dist-js ../src/kobiton-dc