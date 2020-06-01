/**
 * @description 连接 redis 的方法，get set
 * @author 肖龙豪
 */

const redis = require('redis')
const {
  REDIS_CONF
} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', (err) => {
  console.log('redis error', err)
})

/**
 * Redis set
 * @param {Sting} key 键
 * @param {Sting} val 值
 * @param {number} [timeout=60 * 60] 过期时间，单位：秒
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * Redis get
 * @param {String} key 键
 * @returns
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }

      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  get,
  set
}