/**
 * @description User api 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()
const {
  isExist
} = require('../../controller/user')

router.prefix('/api/user')

// 注册路由
router.post('/rigister', async (ctx, next) => {

})

// 判断用户是否存在
router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router