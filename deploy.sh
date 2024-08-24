#!/usr/bin/env sh

echo "installing dependencies ..."
yarn install

echo "building dependencies ..."
yarn build

echo "restarting pm2 services ..."
pm2 restart ecosystem.config.js
