/**
 * @description 环境变量
 * @author 肖龙豪
 */

const ENV = process.env.MODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'production',
  notTest: ENV !== 'production'
}