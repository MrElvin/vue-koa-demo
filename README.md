# vue-koa-demo

> A Vue.js project

## Install

`git clone git@github.com:MrElvin/vue-koa-demo.git`

### frontend

`cd vue-koa-demo && npm install`

### backend

`cd vue-koa-demo/server && npm install`

### mongodb

first modify the vue-koa-demo/server/mongod.conf

change `systemLog.path` to `/path/to/vue-koa-demo/server/mongodb/mongo.log`

change `storage` to `/path/to/vue-koa-demo/server/mongodb`

## Run

### frontend

`npm run dev`   open browser: `localhost:8080`

### backend

`cd ./server && node ./bin/www`

if you have already installed **pm2** , you can also run backend by executing `pm2 start pm2.json`.

### mongodb

`cd ./server && mongod -f mongod.conf`
