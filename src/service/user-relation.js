const {
  User,
  UserRelation
} = require('../db/model/index')

const {
  formatUser
} = require('./_format')

const Sequelize = require('sequelize')

/**
 *
 * 获取关注该用户的的用户列表，即该用户的粉丝列表
 * @param {Number} followerId 被关注用户的 id
 */
async function getUsersByFollowerId(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickname', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: UserRelation,
      where: {
        followerId,
        userId: {
          [Sequelize.Op.ne]: followerId
        }
      }
    }]
  })
  // result.count 总数
  // result.rows 查询结果，数组

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

async function getFollowersByUserId(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['id', 'userName', 'nickname', 'picture']
    }],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    }
  })
  // result.count 总数
  // result.rows 查询结果，数组
  let userList = result.rows.map(row => row.dataValues)

  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {Number} userId 用户 id
 * @param {Number} followerId 被关注用户 id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })

  return result.dataValues
}

/**
 * 删除关注关系
 * @param {Number} userId 用户 id
 * @param {Number} followerId 被关注用户 id
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollowerId,
  addFollower,
  deleteFollower,
  getFollowersByUserId
}