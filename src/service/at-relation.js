/**
 * @description 微博 @ 用户关系 service
 * @author 肖龙豪
 */

const {
  AtRelation,
  Blog,
  User
} = require('../db/model/index')

const {
  formatBlog,
  formatUser
} = require('./_format')

/**
 * 创建 微博 @ 用户 关系
 * @param {Number} blogId 微博 id
 * @param {Number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量
 * @param {Number} userId 用户 id
 */
async function getAtRelationsCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}

/**
 * 获取 @ 用户的微博列表
 * @param {Object} {
 *   userId,
 *   pageIndex = 0,
 *   pageSize = 10
 * }
 */
async function getAtUserBlogList({
  userId,
  pageIndex = 0,
  pageSize = 10
}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: {
          userId
        }
      },
      {
        model: User,
        attributes: ['userName', 'nickname', 'picture']
      }
    ]
  })

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList.map(blog => {
    blog.user = formatUser(blog.user.dataValues)
    return blog
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * 更新 @ 用户关系
 * @param {Object} {newIsRead}
 * @param {Object} {userId,isRead}
 */
async function updateAtRelation({
  newIsRead
}, {
  userId,
  isRead
}) {
  // 拼接更新内容
  let updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }
  // 拼接查询条件
  let whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }
  // 执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })

  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationsCount,
  getAtUserBlogList,
  updateAtRelation
}