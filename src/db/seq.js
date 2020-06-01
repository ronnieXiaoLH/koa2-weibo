/**
 * @description sequelize 实例
 * @author 肖龙豪
 */

const Sequelize = require('sequelize')
const {
  isProd,
  isTest
} = require('../utils/env')

const {
  MYSQL_CONF
} = require('../conf/db')

const {
  user,
  password,
  database
} = MYSQL_CONF

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => {}
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数
    min: 0, // 连接池中最小的连接数
    idle: 10000, // 如果一个连接池中的连接，10s 都没有使用，则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

// 测试连接
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(err => console.log(err))

module.exports = seq