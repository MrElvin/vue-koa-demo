const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const KoaRouter = require('koa-router')
const session = require('koa-session')

const { createBundleRenderer } = require('vue-server-renderer')
const devServerSetup = require('../build/setup-dev-server')

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

const app = new Koa()
const router = new KoaRouter()
const index = require('./routes/index')

app.keys = ['vue koa todo demo']

const CONFIG = {
  key: 'koa:todo',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}

let renderer
let readyPromise
const templatePath = resolve('../index.html')

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false
  }))
}

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  readyPromise = devServerSetup(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

function render (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

const devMiddleware = async (ctx, next) => {
  const context = {
    url: ctx.url
  }
  await readyPromise
  try {
    const html = await render(context)
    ctx.body = html
  } catch (err) {
    await next()
  }
}

const prodMiddleware = async (ctx, next) => {
  const context = {
    url: ctx.url
  }
  console.log('CONT', context)
  try {
    const html = await render(context)
    ctx.body = html
  } catch (err) {
    await next()
  }
}

// error handler
onerror(app)
app.use(session(CONFIG, app))
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router.get('*', isProd ? prodMiddleware : devMiddleware)

app.use(index.routes(), index.allowedMethods())
app.use(router.routes(), router.allowedMethods())
console.log(resolve('../dist'))
app.use(require('koa-static')(resolve('../dist')))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
