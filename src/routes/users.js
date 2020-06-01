const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const {
  SECRET
} = require('../conf/constant')
const util = require('util')
const verify = util.promisify(jwt.verify)

router.prefix('/users')

// 模拟登陆
router.post('/login', async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body
  let userInfo
  if (username === 'zhangsan' && password === '123456') {
    userInfo = {
      userId: 1,
      username: 'zhangsan',
      nickname: '张三',
      gender: 'male'
    }
  }

  // 加密 userInfo
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, SECRET, {
      expiresIn: '1h'
    })
  }

  if (!userInfo) {
    ctx.body = {
      errno: -1,
      massage: '登录失败'
    }
    return
  }

  ctx.body = {
    errno: 0,
    data: token
  }
})

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.headers.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      errno: 0,
      userInfo: payload
    }
  } catch (error) {
    ctx.body = {
      errno: -1,
      massage: 'verify token failed'
    }
  }
})

module.exports = router