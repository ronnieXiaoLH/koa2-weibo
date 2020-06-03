/**
 * @description user view 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()

const {
  loginRedirect
} = require('../../middlewares/loginChecks')

/**
 * @param {Object} ctx koa2 ctx
 */
function getUserInfo(ctx) {
  let data = {
    isLogin: false // 默认未登录
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async ctx => {
  await ctx.render('login', getUserInfo(ctx))
})

router.get('/register', async ctx => {
  // await ctx.render('register', getUserInfo(ctx))
  await ctx.render('register', {
    isLogin: false
  })
})

router.get('/setting', loginRedirect, async ctx => {
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router