/**
 * @description user controller
 * @author 肖龙豪
 */

const {
  getUserInfo,
  createUser,
  registerFailInfo
} = require('../service/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  loginFailInfo
} = require('../model/ErrorInfo')
const {
  doCrypto
} = require('../utils/crypto')

/**
 * 判断用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 找到
    return new SuccessModel(userInfo)
  } else {
    // 用户未存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} gender 性别
 */
async function register({
  userName,
  password,
  gender
}) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 找到
    return new ErrorModel(registerUserNameExistInfo)
  }
  // 注册
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {String} userName
 * @param {String} password
 * @returns
 */
async function login(ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  // 登录成功
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
}