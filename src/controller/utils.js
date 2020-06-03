/**
 * @description utils controller
 * @author 肖龙豪
 */

const fsExtra = require('fs-extra')
const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel')
const {
  uploadFileSizeFailInfo
} = require('../model/ErrorInfo')
const path = require('path')

// 文件最大上传体积
const MAX_SIZE = 1024 * 1024 * 1024
// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', '/uploadFiles')

// 是否需要创建目录
fsExtra.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fsExtra.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {String} type 文件类型
 * @param {String} size 文件大小
 * @param {String} name 文件名
 * @param {String} filePath 文件路径
 */
async function saveFile({
  type,
  filePath,
  name,
  size
}) {
  if (size > MAX_SIZE) {
    // 删除文件
    await fsExtra.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fsExtra.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}