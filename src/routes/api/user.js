/**
 * @description User api 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()
const {
  isExist,
  register
} = require('../../controller/user')

const userValidate = require('../../validator/user')
const {
  genValidator
} = require('../../middlewares/validator')

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

module.exports = router