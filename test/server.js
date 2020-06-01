/**
 * @description jest server
 * @author 肖龙豪
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)