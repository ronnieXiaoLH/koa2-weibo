/**
 * @description 微博 @ 用户关系 service
 * @author 肖龙豪
 */

const {
  AtRelation
} = require('../db/model/index')

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

module.exports = {
  createAtRelation,
  getAtRelationsCount
}