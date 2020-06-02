/**
 * @description user controller
 * @author 肖龙豪
 */

const {
  getUserInfo
} = require('../service/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  registerUserNameNotExistInfo
} = require('../model/ErrorInfo')

/**
 * 判断用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  console.log('userName', userName)
  const userInfo = await getUserInfo(userName)
  console.log('userInfo', userInfo)
  if (userInfo) {
    // 找到
    return new SuccessModel(userInfo)
  } else {
    // 用户未存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}