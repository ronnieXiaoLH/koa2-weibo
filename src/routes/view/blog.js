/**
 * @description blog view 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()

const {
  loginRedirect
} = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {})
})

module.exports = router