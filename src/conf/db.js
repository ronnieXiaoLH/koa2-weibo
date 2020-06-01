/**
 * @description 储存配置
 * @author 肖龙豪
 */
const {
  isProd
} = require('../utils/env')

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'koa2_weibo_db'
}

if (isProd) {
  // 线上配置
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}