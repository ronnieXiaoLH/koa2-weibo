/**
 * @description 登录验证中间件
 * @author 肖龙豪
 */

const {
  ErrorModel
} = require('../model/ResModel')
const {
  loginCheckFailInfo
} = require('../model/ErrorInfo')

/**
 * @param {Object} ctx ctx
 * @param {Function} next next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * @param {Object} ctx ctx
 * @param {Function} next next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登录
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}