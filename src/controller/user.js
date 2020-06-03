/**
 * @description user controller
 * @author 肖龙豪
 */

const {
  getUserInfo,
  createUser,
  registerFailInfo,
  deleteUser,
  updateUser,
  changePasswordFailInfo
} = require('../service/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo
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

/**
 * 删除当前用户
 * @param {String} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 删除成功
    return new SuccessModel()
  }
  // 删除失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {Object} ctx ctx
 * @param {String} nickname 昵称
 * @param {String} city 城市
 * @param {String} picture 图片（路径）
 */
async function changeInfo(ctx, {
  nickname,
  city,
  picture
}) {
  const {
    userName
  } = ctx.session.userInfo
  const result = await updateUser({
    newNickname: nickname,
    newCity: city,
    newPicture: picture
  }, {
    userName
  })
  if (result) {
    // 更新成功
    // 1. 更新 session
    Object.assign(ctx.session.userInfo, {
      nickname,
      city,
      picture
    })
    return new SuccessModel()
  }
  // 更新失败
  return new ErrorModel(changeInfoFailInfo)
}

async function changePassword({
  userName,
  password,
  newPassword
}) {
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })
  if (result) {
    // 修改成功
    return new SuccessModel()
  }
  // 修改失败
  return new ErrorModel(changePasswordFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword
}