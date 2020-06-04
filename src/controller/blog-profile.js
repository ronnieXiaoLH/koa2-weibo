/**
 * @destription profile controller
 * @author 肖龙豪
 */

const {
  getBlogListByUser
} = require('../service/blog')

const {
  PAGE_SIZE
} = require('../conf/constant')

const {
  SuccessModel
} = require('../model/ResModel')

/**
 * 获取个人主页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前第几页
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  // 拼接返回的数据
  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
    count: result.count
  })
}

module.exports = {
  getProfileBlogList
}