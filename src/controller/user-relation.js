/**
 * @description user-relation controller
 * @author 肖龙豪
 */

const {
  getUsersByFollowerId,
  addFollower,
  deleteFollower
} = require('../service/user-relation')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')

const {
  addFollowerFailInfo,
  deleteFollowerFailInfo
} = require('../model/ErrorInfo')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  const {
    count,
    userList
  } = await getUsersByFollowerId(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList
  })
}

/**
 * 关注
 * @param {Number} myUserId 当前用户 id
 * @param {Number} curUserId 被关注用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {Number} myUserId 当前用户 id
 * @param {Number} curUserId 被关注用户 id
 */
async function unfollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId)
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unfollow
}