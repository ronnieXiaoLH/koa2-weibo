/**
 * @description 微博 @ 用户 controller
 * @author 肖龙豪
 */

const {
  getAtRelationsCount,
  getAtUserBlogList
} = require('../service/at-relation')

const {
  SuccessModel
} = require('../model/ResModel')

const {
  PAGE_SIZE
} = require('../conf/constant')

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

/**
 * 获取 @ 用户的微博列表
 * @param {Number} userId 用户 id 
 * @param {number} [pageIndex=0] 当前第几页
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const {
    count,
    blogList
  } = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList
}