/**
 * @description 首页 controller
 * @author 肖龙豪
 */
const xss = require('xss')

const {
  createBlog,
  getBlogLIstByFollower
} = require('../service/blog')

const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  createBlogFailInfo
} = require('../model/ErrorInfo')

const {
  PAGE_SIZE,
  REG_FOR_AT_WHO
} = require('../conf/constant')

const {
  getUserInfo
} = require('../service/user')

const {
  createAtRelation
} = require('../service/at-relation')

/**
 * 创建微博
 * @param {Object} {userId, content, image}
 */
async function create({
  userId,
  content,
  image
}) {
  // 分析 并 收集 content 中 @ 的用户
  // content 的格式如：'哈喽 @张三 - zhangsan 你好，@李四 - lisi'
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickname, userName) => {
    // 收集 content 中 @ 的用户
    atUserNameList.push(userName)
    return matchStr
  })

  // 根据 @ 用户名 获取 用户信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)))

  // 根据用户信息 获取 用户 id
  const atUserIdList = atUserList.map(user => user.id)

  try {
    // 创建微博
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })

    // 创建 @ 关系
    await Promise.all(atUserIdList.map(userId => createAtRelation(blog.id, userId)))

    return new SuccessModel(blog)
  } catch (error) {
    console.log(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {Number} userId 用户 id 
 * @param {Number} [pageIndex=0] 当前第几页
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getBlogLIstByFollower({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  if (result) {
    const {
      count,
      blogList
    } = result
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      pageIndex,
      pageSize: PAGE_SIZE,
      blogList,
      count
    })
  }
}

module.exports = {
  create,
  getHomeBlogList
}