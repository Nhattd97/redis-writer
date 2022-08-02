#!/bin/bash

module_name="$1"

git submodule sync -- ./$module_name
git submodule update --remote --checkout ./$module_name

# compile new code
bash ./scripts/compile-protoc.sh
