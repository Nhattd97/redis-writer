# Redis Writer

Contents of this file
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Maintainers


Introduction
------------

The repository for Redis Writer service which is responsible for handle and write device info to Redis


Requirements
------------

 * `Node 16`
 * `Yarn 3`


Installation
------------

 * Add these variables to your `~/.zshrc` or `~/.zshenv`, required by `node-rdkafka` in `@kobiton/core-service` ([reference](https://github.com/Blizzard/node-rdkafka#mac-os-high-sierra--mojave))
    ```sh
    export CPPFLAGS=-I/usr/local/opt/openssl/include
    export LDFLAGS=-L/usr/local/opt/openssl/lib
    ```
 * Run `yarn npm login` login to npm to install kobiton private packages (use npm credential in LastPass)
 * Run `yarn install` to install dependencies
 * Run `yarn start` to start device-connector


Configuration
-------------

Configurable parameters:
 * ENV 1
 * ENV 2


Maintainers
-----------

 * Nhat Tran
