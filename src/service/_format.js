/**
 * @description 数据格式化
 * @author 肖龙豪
 */

const {
  DEFAULT_PICTURE
} = require('../conf/constant')

/**
 * 设置用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (!obj.picture) {
    obj.picture = DEFAULT_PICTURE // 设置默认值
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或单个用户
 */
function formatUser(list) {
  if (!list) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}