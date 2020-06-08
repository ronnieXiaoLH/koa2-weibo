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
  changeInfo,
  changePassword,
  logout
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

const {getFolowers} = require('../../controller/user-relation')

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
    nickname,
    city,
    picture
  } = ctx.request.body
  ctx.body = await changeInfo(ctx, {
    nickname,
    city,
    picture
  })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const {
    password,
    newPassword
  } = ctx.request.body
  const {
    userName
  } = ctx.session.userInfo
  ctx.body = await changePassword({
    password,
    newPassword,
    userName
  })
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

// at 某人，获取关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const {id:userId} = ctx.session.userInfo
  const result = await getFolowers(userId)
  const {followersList} = result.data
  const list = followersList.map(v => {
    return `${v.nickname} - ${v.userName}`
  })
  ctx.body = list
})

module.exports = router