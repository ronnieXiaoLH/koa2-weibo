/**
 * @description 微博 @ 用户模型
 * @author 肖龙豪
 */

const seq = require('../seq')

const {
  INTEGER,
  BOOLEAN
} = require('../types')

const AtRelation = seq.define('atRealtion', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博 ID'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '@ 信息是否已读'
  }
})

module.exports = AtRelation