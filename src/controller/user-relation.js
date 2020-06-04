/**
 * @description user-relation controller
 * @author 肖龙豪
 */

const {
  getUsersByFollowerId
} = require('../service/user-relation')

const {
  SuccessModel
} = require('../model/ResModel')

/**
 * 根据用户 id 获取粉丝列表
 * @param {Number} userId 用户 id
 */
async function getFansList(userId) {
  const {
    count,
    userList
  } = await getUsersByFollowerId(userId)
  return new SuccessModel({
    count,
    userList
  })
}

module.exports = {
  getFansList
}