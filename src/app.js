const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {
  isProd
} = require('./utils/env')
const path = require('path')
const koaStatic = require('koa-static')
// const jwtKoa = require('koa-jwt')
// const {
//   SECRET
// } = require('./conf/constant')

const {
  SESSION_SECRET_KEY
} = require('./conf/secret')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {
  REDIS_CONF
} = require('./conf/db')

const users = require('./routes/users')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')
const blogViewRouter = require('./routes/view/blog')
const homeApiRouter = require('./routes/api/blog-home')
const profileApiRouter = require('./routes/api/blog-profile')
const squareApiRouter = require('./routes/api/blog-square')
const atApiRouter = require('./routes/api/blog-at')

const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: 'error'
  }
}
onerror(app, onerrorConf)

// session 配置
app.keys = ['H*dshgH_1615']
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: {
    path: '/',
    httpOnly: true, // 客户端无法修改
    maxAge: 60 * 60 * 1000 // 过期时间，单位：ms
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// app.use(jwtKoa({
//   secret: SECRET
// }).unless({
//   path: [/^\/users\/login/] // 自定义哪些接口忽略 jwt 验证
// }))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', '/uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(homeApiRouter.routes(), homeApiRouter.allowedMethods())
app.use(profileApiRouter.routes(), profileApiRouter.allowedMethods())
app.use(squareApiRouter.routes(), squareApiRouter.allowedMethods())
app.use(atApiRouter.routes(), atApiRouter.allowedMethods())

// 404 路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app