/**
 * @description 数据模型入口文件
 * @author 肖龙豪
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(UserRelation, {
  foreignKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}