/**
 * @description UserRelation 模型
 * @author 肖龙豪
 */

const seq = require('../seq')

const {
  INTEGER
} = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户 ID'
  }
})

module.exports = UserRelation