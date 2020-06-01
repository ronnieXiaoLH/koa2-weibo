/**
 * @description json test
 * @author 肖龙豪
 */

const server = require('./server')

test('json 接口数据返回格式正确', async () => {
  const res = await server.get('./json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})