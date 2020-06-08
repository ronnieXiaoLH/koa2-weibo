/**
 * @description 首页 controller
 * @author 肖龙豪
 */
const xss = require('xss')

const {
  createBlog,
  getBlogLIstByFollower
} = require('../service/blog')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  createBlogFailInfo
} = require('../model/ErrorInfo')

const {
  PAGE_SIZE
} = require('../conf/constant')

/**
 * 创建微博
 * @param {Object} {userId, content, image}
 */
async function create({
  userId,
  content,
  image
}) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {Number} userId 用户 id 
 * @param {Number} [pageIndex=0] 当前第几页
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getBlogLIstByFollower({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  if (result) {
    const {
      count,
      blogList
    } = result
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      pageIndex,
      pageSize: PAGE_SIZE,
      blogList,
      count
    })
  }
}

module.exports = {
  create,
  getHomeBlogList
}