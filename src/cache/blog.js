/**
 * @description 微博缓存层
 * @author 肖龙豪
 */

const {
  get,
  set
} = require('./_redis')

const {
  getBlogListByUser
} = require('../service/blog')

const KEY_PREFIX = 'weibo:square:'

async function getSquareCacheList({
  pageIndex,
  pageSize
}) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  const cacheResult = await get(key)
  if (cacheResult) {
    // 从缓存获取数据成功
    return cacheResult
  }
  // 没有缓存，读取数据库
  const result = await getBlogListByUser({
    pageIndex,
    pageSize
  })
  // 设置缓存，过期时间 1 min
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}