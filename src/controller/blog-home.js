/**
 * @description 首页 controller
 * @author 肖龙豪
 */
const xss = require('xss')

const {
  createBlog
} = require('../service/blog')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  createBlogFailInfo
} = require('../model/ErrorInfo')

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

module.exports = {
  create
}