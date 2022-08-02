#!/bin/bash

rootDir="`pwd`"

cd $rootDir

# Use "Jenkins" file as a flag to prevent 'yarn install'
# commands re-sync submodule in build folder.
# if [[ -f "Jenkinsfile" ]]; then
#   # Sync git submodule
#   git submodule update
#   $rootDir/scripts/compile-protoc.sh
# fi
git submodule update
$rootDir/scripts/compile-protoc.sh

