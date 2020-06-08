/**
 * @description blog view 路由
 * @author 肖龙豪
 */

const router = require('koa-router')()

const {
  loginRedirect
} = require('../../middlewares/loginChecks')

const {
  getProfileBlogList
} = require('../../controller/blog-profile')

const {
  isExist
} = require('../../controller/user')

const {
  getSquareBlogList
} = require('../../controller/blog-square')

const {
  getFans,
  getFolowers
} = require('../../controller/user-relation')

const {
  getHomeBlogList
} = require('../../controller/blog-home')

const {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
} = require('../../controller/blog-at')

// 首页
router.get('/', loginRedirect, async ctx => {
  // 获取个人信息
  const userInfo = ctx.session.userInfo
  const {
    id: userId
  } = userInfo
  // 获取粉丝列表
  const fansResult = await getFans(userId)
  const {
    count: fansCount,
    fansList
  } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFolowers(userId)
  const {
    count: followersCount,
    followersList
  } = followersResult.data

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const {
    count: atCount
  } = atCountResult.data

  // 获取微博第一页数据
  const result = await getHomeBlogList(userId)
  const {
    isEmpty,
    pageIndex,
    pageSize,
    blogList,
    count
  } = result.data

  await ctx.render('index', {
    blogData: {
      isEmpty,
      pageSize,
      pageIndex,
      blogList,
      count
    },
    userData: {
      userInfo,
      atCount,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    }
  })
})

// 个人主页
router.get('/profile', loginRedirect, async ctx => {
  const {
    userName
  } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async ctx => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const {
    userName: curUserName
  } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 获取微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const {
    isEmpty,
    blogList,
    pageIndex,
    pageSize,
    count
  } = result.data

  // 获取粉丝
  const fansResult = await getFans(curUserInfo.id)
  const {
    count: fansCount,
    fansList
  } = fansResult.data

  // 我是否关注了此人
  const amIFollowed = fansList.some(v => v.userName === myUserName)

  // 获取关注人列表
  const followersResult = await getFolowers(curUserInfo.id)
  const {
    count: followersCount,
    followersList
  } = followersResult.data

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const {
    count: atCount
  } = atCountResult.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed,
      atCount
    }
  })
})

router.get('/square', loginRedirect, async ctx => {
  // 获取广场第一页数据
  const result = await getSquareBlogList(0)
  const {
    isEmpty,
    blogList,
    pageIndex,
    pageSize,
    count
  } = result.data
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })
})

router.get('/at-me', loginRedirect, async ctx => {
  const {
    id: userId
  } = ctx.session.userInfo
  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId)
  const {
    count: atCount
  } = atCountResult.data

  // 获取第一页列表
  const result = await getAtMeBlogList(userId)
  const {
    isEmpty,
    pageIndex,
    pageSize,
    blogList,
    count
  } = result.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })

  // 标记为已读
  if (atCount > 0) {
    await markAsRead(userId)
  }
})

module.exports = router