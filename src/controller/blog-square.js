/**
 * @description 广场页 controller
 * @author 肖龙豪
 */

const {
  getSquareCacheList
} = require('../cache/blog')

const {
  PAGE_SIZE
} = require('../conf/constant')

const {
  SuccessModel
} = require('../model/ResModel')

/**
 * 获取广场微博列表
 * @param {Number} pageIndex 当前第几页
 */
async function getSquareBlogList(pageIndex) {
  const result = await getSquareCacheList({
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
  getSquareBlogList
}