/**
 * @description user service
 * @author 肖龙豪
 */

const {
  User
} = require('../db/model/index')
const {
  formatUser
} = require('./_format')

/**
 * 获取用户信息
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  console.log('whereOpt', whereOpt)
  if (password) {
    Object.assign(whereOpt, {
      password
    })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  if (!result) {
    // 未找到
    return result
  }

  // 格式化
  const formatResult = formatUser(result.dataValues)

  return formatResult
}

module.exports = {
  getUserInfo
}