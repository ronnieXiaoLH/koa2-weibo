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
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别 （1 男，2 女，3 保密）
 * @param {String} nickname 昵称
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

/**
 * 删除用户
 * @param {*} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result 删除的行数
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser
}