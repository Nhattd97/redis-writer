#!/bin/bash

# "Jenkins" file is a flag to detect whether the `yarn install` runs on Jenkins or
# the application server.
# if [[ -f "Jenkinsfile" ]]; then
#   git submodule update --init
# fi
git submodule update --init

os_name=$(node -e "console.log(process.platform)")
if [ "$os_name" = "darwin" ]; then
  if [ -z "$CPPFLAGS" -o -z "$LDFLAGS" ]; then
    #  The installing node-rdkafka in core-service module requires
    #  requisite steps (see below links) on MacOS
    #  https://github.com/Blizzard/node-rdkafka#mac-os-high-sierra--mojave
    echo ""
    echo "Please re-run the command 'yarn install|add|remove ...' as below"
    echo ""
    echo "    CPPFLAGS=-I/usr/local/opt/openssl/include LDFLAGS=-L/usr/local/opt/openssl/lib yarn ..."
    echo ""
    echo "The above env variables are required for compiling module node-rdkafka in core-service on MacOS"
    echo ""
    exit -1
  fi
fi
