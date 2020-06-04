/**
 * @description blog service
 * @author 肖龙豪
 */

const {
  Blog
} = require('../db/model/index')

/**
 * 创建微博
 * @param {Object} {userId,content,image}
 */
async function createBlog({
  userId,
  content,
  image
}) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}