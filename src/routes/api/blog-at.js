/**
 * @description @ 用户 controller
 * @author 肖龙豪
 */

const router = require('koa-router')()
const {
  loginCheck
} = require('../../middlewares/loginChecks')
const {
  getAtMeBlogList
} = require('../../controller/blog-at')
const {
  getBlogListStr
} = require('../../utils/blog')

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const {
    id: userId
  } = ctx.session.userInfo
  let {
    pageIndex
  } = ctx.params
  pageIndex = parseInt(pageIndex, 10)
  const result = await getAtMeBlogList(userId, pageIndex)

  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router