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
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
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

/**
 *
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1 男，2 女，3 保密）
 * @param {string} nickname 昵称
 */
async function createUser({
  userName,
  password,
  gender = 3,
  nickname
}) {
  const result = User.create({
    userName,
    password,
    gender,
    nickname: nickname ? nickname : userName
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}