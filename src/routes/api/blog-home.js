/**
 * @description 首页 api 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()

router.prefix('/api/blog')

const blogValidate = require('../../validator/blog')
const {
  genValidator
} = require('../../middlewares/validator')

const {
  loginCheck
} = require('../../middlewares/loginChecks')

const {
  create,
  getHomeBlogList
} = require('../../controller/blog-home')

const {
  getBlogListStr
} = require('../../utils/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const {
    content,
    image
  } = ctx.request.body
  const {
    id: userId
  } = ctx.session.userInfo
  ctx.body = await create({
    userId,
    content,
    image
  })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let {
    pageIndex
  } = ctx.params
  pageIndex = parseInt(pageIndex, 10)
  const {
    id: userId
  } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)

  // 渲染为 html 字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router