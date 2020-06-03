/**
 * @description User api 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo
} = require('../../controller/user')

const userValidate = require('../../validator/user')
const {
  genValidator
} = require('../../middlewares/validator')

const {
  isTest
} = require('../../utils/env')

const {
  loginCheck
} = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const {
    userName,
    password,
    gender
  } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 判断用户是否存在
router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const {
    userName,
    password
  } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试登录后，删除自己的账号
    const {
      userName
    } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {
    nickName,
    city,
    picture
  } = ctx.request.body
  ctx.body = await changeInfo(ctx, {
    nickName,
    city,
    picture
  })
})

router.get('/test', async (ctx, next) => {
  ctx.body = 'test'
})

module.exports = router