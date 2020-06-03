const {
  User
} = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  // build 会构建一个 User 实例，但不会提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    // gender: 1,
    nickname: '张三',
    picture: 'xxx.jpg',
    city: '杭州'
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.gender).toBe(3)
  expect(user.nickname).toBe('张三')
  expect(user.picture).toBe('xxx.jpg')
  expect(user.city).toBe('杭州')
})