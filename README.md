# vue-koa-demo

> A Vue.js project

## Preview online

[vue-koa-demo](http://39.105.89.85:3000/)

## Install

`git clone git@github.com:MrElvin/vue-koa-demo.git`

### frontend

`cd vue-koa-demo && npm install`

### backend

`cd vue-koa-demo/server && npm install`

### mongodb

first modify the vue-koa-demo/server/mongod.prod.conf

change `systemLog.path` to `/path/to/mongodb.log`

change `storage` to `/path/to/mongodb/data`

## Run

### frontend

`npm run dev`   open browser: `localhost:8080`

### backend

`cd ./server && node ./bin/www`

if you have already installed **pm2** , you can also run backend by executing `pm2 start pm2.json`.

### mongodb

`mongod -f /path/to/your/mongod.conf`
