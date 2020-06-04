const {
  User,
  UserRelation
} = require('../db/model/index')

const {
  formatUser
} = require('./_format')

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
        followerId
      }
    }]
  })

  // result.count 总数
  // result.rows 查询的结果，数组
  // 格式化数据
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

module.exports = {
  getUsersByFollowerId
}