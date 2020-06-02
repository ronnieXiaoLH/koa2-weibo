/**
 * @description 封装 Sequelize 数据模型
 * @author 肖龙豪
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  TEXT: Sequelize.TEXT,
  BOOLEAN: Sequelize.BOOLEAN,
  INTEGER: Sequelize.INTEGER,
  DECIMAL: Sequelize.DECIMAL
}