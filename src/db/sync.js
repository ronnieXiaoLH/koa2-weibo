/**
 * @description sequelize 数据库同步
 * @author 肖龙豪
 */

const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth error')
})

// 执行同步
seq.sync({
  force: true
}).then(() => {
  console.log('sync ok')
  process.exit()
})