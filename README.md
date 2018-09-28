# vue-koa-demo

> 一个第一次接触全栈的**小**白搞得一个已经线上部署了的**小**demo

## 项目说明

- UI：Element
- 前端框架：Vue
- 后端框架：Koa
- 数据库：Mongodb
- 部署：PM2

## 分支说明

- master: 前后端分离分支
- ssr: Vue 服务端渲染分支

## 项目相关博客

- [阿里云 CentOS 环境下 Node 环境搭建](http://www.breezymelon.com/2018/05/16/%E9%98%BF%E9%87%8C%E4%BA%91%20CentOS%20%E7%8E%AF%E5%A2%83%E4%B8%8B%20Node%20%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/)

- [一次前后端分离项目部署实践](https://www.breezymelon.com/2018/06/14/%E4%B8%80%E6%AC%A1%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E5%AE%9E%E8%B7%B5/)

- [Vue SSR 初探](https://www.breezymelon.com/2018/09/28/Vue-ssr-%E5%88%9D%E6%8E%A2/)

## 在线预览

[vue-koa-demo](http://todo.breezymelon.com/)

## 安装

`git clone git@github.com:MrElvin/vue-koa-demo.git`

### 前端

`cd vue-koa-demo && npm install`

### 后端

`cd vue-koa-demo/server && npm install`

### mongodb 数据库

为了在本地把项目跑起来，需要：
1. 在 mongodb 数据库中建立一个名为 **vue_koa_todos** 的数据库
2. 修改 `server/routes/index.js` 中的链接命令，对**第九行**取消注释并把端口号设置定为本地 mongod.conf 文件中配置的端口号，注释掉**第十行**


## 运行

### 前端

在项目根路径下执行 `npm run dev` 打开浏览器 `localhost:8080`

### 后端

在项目根路径下执行 `cd ./server && node ./bin/www`

### mongodb 数据库

`mongod -f /path/to/your/mongod.conf`
