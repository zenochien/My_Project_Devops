#!/bin/sh

## Migrate
node -r dotenv/config ./scripts/migrate.js dotenv_config_path=.env

## Start
export SERVER_APIDOC_PATH=${SERVER_APIDOC_PATH:-apidoc}
export NODE_ENV=production

node "src/index.js"
