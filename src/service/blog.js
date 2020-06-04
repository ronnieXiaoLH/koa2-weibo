/**
 * @description blog service
 * @author 肖龙豪
 */

const {
  Blog,
  User
} = require('../db/model/index')

const {
  formatUser,
  formatBlog
} = require('./_format')

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

/**
 *
 * 根据用户查询博客
 * @param {Object} {
 *   userName,
 *   pageIndex = 0,
 *   pageSize = 10
 * }
 */
async function getBlogListByUser({
  userName,
  pageIndex = 0,
  pageSize = 10
}) {
  // 拼接查询条件
  let userWhereOpt = {}
  if (userName) {
    userWhereOpt.userName = userName
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['userName', 'nickname', 'picture'],
      where: userWhereOpt
    }]
  })

  // result.count 总数，跟分页无关
  // result.rows 查询结果，数组
  let blogList = result.rows.map(row => row.dataValues)
  // 格式化
  blogList = formatBlog(blogList)
  blogList.map(blog => {
    const user = blog.user.dataValues
    blog.user = formatUser(user)
    return blog
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}