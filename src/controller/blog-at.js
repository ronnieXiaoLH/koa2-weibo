/**
 * @description 微博 @ 用户 controller
 * @author 肖龙豪
 */

const {
  getAtRelationsCount
} = require('../service/at-relation')

const {
  SuccessModel
} = require('../model/ResModel')

/**
 * 获取 at 用户的 微博数量
 * @param {Number} userId 用户 id
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationsCount(userId)
  return new SuccessModel({
    count
  })
}

module.exports = {
  getAtMeCount
}