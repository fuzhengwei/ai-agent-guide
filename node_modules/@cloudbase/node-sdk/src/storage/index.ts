import fs from 'fs'
import path from 'path'
import { Readable } from 'stream'
import { parseString } from 'xml2js'

import * as tcbapicaller from '../utils/tcbapirequester'
import { request } from '../utils/request-core'
import { E, processReturn } from '../utils/utils'
import { ERROR } from '../const/code'

import {
  ICustomReqOpts,

  IUploadFileOptions,
  IUploadFileResult,
  IDownloadFileOptions,
  IDownloadFileResult,
  ICopyFileOptions,
  ICopyFileResult,
  IDeleteFileOptions,
  IDeleteFileResult,
  IGetFileUrlOptions,
  IGetFileUrlResult,
  IGetFileInfoOptions,
  IGetFileInfoResult,
  IGetUploadMetadataOptions,
  IGetUploadMetadataResult,
  IGetFileAuthorityOptions,
  IGetFileAuthorityResult,
  IFileInfo,
  IFileUrlInfo

} from '../../types'

import { CloudBase } from '../cloudbase'

async function parseXML(str) {
  return await new Promise((resolve, reject) => {
    parseString(str, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

/**
 * 上传文件
 * @param {string} cloudPath 上传后的文件路径
 * @param {fs.ReadStream | Buffer} fileContent  上传文件的二进制流
 */
export async function uploadFile(cloudbase: CloudBase, { cloudPath, fileContent }: IUploadFileOptions, opts?: ICustomReqOpts): Promise<IUploadFileResult> {
  if (!(fileContent instanceof fs.ReadStream) && !(fileContent instanceof Buffer)) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '[node-sdk] fileContent should be instance of fs.ReadStream or Buffer'
    })
  }
  const {
    requestId,
    data: { url, token, authorization, fileId, cosFileId }
  } = await getUploadMetadata(cloudbase, { cloudPath }, opts)

  const headers = {
    Signature: authorization,
    'x-cos-security-token': token,
    'x-cos-meta-fileid': cosFileId,
    authorization,
    key: encodeURIComponent(cloudPath)
  }
  const fileStream = Readable.from(fileContent)

  let body = await new Promise<any>((resolve, reject) => {
    const req = request({ method: 'put', url, headers, type: 'raw' }, (err, _, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
    req.on('error', (err) => {
      reject(err)
    })
    // automatically close, no need to call req.end
    fileStream.pipe(req)
  })

  // 成功返回空字符串，失败返回如下格式 XML：
  // <?xml version='1.0' encoding='utf-8' ?>
  // <Error>
  //     <Code>InvalidAccessKeyId</Code>
  //     <Message>The Access Key Id you provided does not exist in our records</Message>
  //     <Resource>/path/to/file/key.xyz</Resource>
  //     <RequestId>NjQzZTMyYzBfODkxNGJlMDlfZjU4NF9hMjk4YTUy</RequestId>
  //     <TraceId>OGVmYzZiMmQzYjA2OWNhODk0NTRkMTBiOWVmMDAxODc0OWRkZjk0ZDM1NmI1M2E2MTRlY2MzZDhmNmI5MWI1OTQyYWVlY2QwZTk2MDVmZDQ3MmI2Y2I4ZmI5ZmM4ODFjYmRkMmZmNzk1YjUxODZhZmZlNmNhYWUyZTQzYjdiZWY=</TraceId>
  // </Error>
  body = await parseXML(body)

  if (body?.Error) {
    const {
      Code: [code],
      Message: [message],
      RequestId: [cosRequestId],
      TraceId: [cosTraceId]
    } = body.Error

    if (code === 'SignatureDoesNotMatch') {
      return processReturn({
        ...ERROR.SYS_ERR,
        message: `[${code}]: ${message}`,
        requestId: `${requestId}|${cosRequestId}|${cosTraceId}`
      })
    }

    return processReturn({
      ...ERROR.STORAGE_REQUEST_FAIL,
      message: `[${code}]: ${message}`,
      requestId: `${requestId}|${cosRequestId}|${cosTraceId}`
    })
  }

  return {
    fileID: fileId
  }
}

/**
 * 删除文件
 * @param {Array.<string>} fileList 文件id数组
 */
export async function deleteFile(cloudbase: CloudBase, { fileList }: IDeleteFileOptions, opts?: ICustomReqOpts): Promise<IDeleteFileResult> {
  if (!fileList || !Array.isArray(fileList)) {
    return processReturn({
      ...ERROR.INVALID_PARAM,
      message: 'fileList必须是非空的数组'
    })
  }

  for (const file of fileList) {
    if (!file || typeof file !== 'string') {
      return processReturn({
        ...ERROR.INVALID_PARAM,
        message: 'fileList的元素必须是非空的字符串'
      })
    }
  }

  const params = {
    action: 'storage.batchDeleteFile',
    fileid_list: fileList
  }

  return await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if (res.code) {
      return res
    }
    //     throw E({ ...res })
    // } else {
    return {
      fileList: res.data.delete_list,
      requestId: res.requestId
    }
    // }
  })
}

/**
 * 获取文件下载链接
 * @param {Array.<Object>} fileList
 */
export async function getTempFileURL(cloudbase: CloudBase, { fileList }: IGetFileUrlOptions, opts?: ICustomReqOpts): Promise<IGetFileUrlResult> {
  if (!fileList || !Array.isArray(fileList)) {
    return processReturn({
      ...ERROR.INVALID_PARAM,
      message: 'fileList必须是非空的数组'
    })
  }

  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  const file_list = []
  for (const file of fileList) {
    if (typeof file === 'object') {
      if (!Object.prototype.hasOwnProperty.call(file, 'fileID')
        || !Object.prototype.hasOwnProperty.call(file, 'maxAge')) {
        return processReturn({
          ...ERROR.INVALID_PARAM,
          message: 'fileList 的元素如果是对象，必须是包含 fileID 和 maxAge 的对象'
        })
      }

      file_list.push({
        fileid: file.fileID,
        max_age: file.maxAge,
        url_type: file.urlType
      })
    } else if (typeof file === 'string') {
      file_list.push({
        fileid: file
      })
    } else {
      return processReturn({
        ...ERROR.INVALID_PARAM,
        message: 'fileList的元素如果不是对象，则必须是字符串'
      })
    }
  }

  const params = {
    action: 'storage.batchGetDownloadUrl',
    file_list
  }

  return await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if (res.code) {
      return res
    }
    return {
      fileList: res.data.download_list,
      requestId: res.requestId
    }
  })
}

export async function getFileInfo(cloudbase: CloudBase, { fileList }: IGetFileInfoOptions, opts?: ICustomReqOpts): Promise<IGetFileInfoResult> {
  const fileInfo = await getTempFileURL(cloudbase, { fileList }, opts)

  if (fileInfo?.fileList && fileInfo?.fileList?.length > 0) {
    const fileList = await Promise.all(fileInfo.fileList.map(async (item: IFileUrlInfo) => {
      if (item.code !== 'SUCCESS') {
        return {
          code: item.code,
          fileID: item.fileID,
          tempFileURL: item.tempFileURL
        }
      }

      try {
        const res = await fetch(encodeURI(item.tempFileURL), { method: 'HEAD' })

        const fileSize = parseInt(res.headers.get('content-length')) || 0
        const contentType = res.headers.get('content-type') || ''

        const fileInfo: IFileInfo = {
          code: item.code,
          fileID: item.fileID,
          tempFileURL: item.tempFileURL,

          cloudId: item.fileID,
          fileName: item.fileID.split('/').pop(),
          contentType,
          mime: contentType.split(';')[0].trim(),
          size: fileSize
        }

        return fileInfo
      } catch (e) {
        return {
          code: 'FETCH_FILE_INFO_ERROR',
          fileID: item.fileID,
          tempFileURL: item.tempFileURL
        }
      }
    }))

    return {
      fileList,
      requestId: fileInfo.requestId
    }
  }

  return {
    fileList: [],
    requestId: fileInfo.requestId
  }
}

export async function downloadFile(cloudbase: CloudBase, { fileID, urlType, tempFilePath }: IDownloadFileOptions, opts?: ICustomReqOpts): Promise<IDownloadFileResult> {
  const tmpUrlRes = await getTempFileURL(
    cloudbase,
    {
      fileList: [
        {
          fileID,
          urlType,
          maxAge: 600
        }
      ]
    },
    opts
  )

  const res = tmpUrlRes.fileList[0]

  if (res.code !== 'SUCCESS') {
    return processReturn({
      ...res
    })
  }

  // COS_URL 场景下，不需要再进行 Encode URL
  const tmpUrl = urlType === 'COS_URL' ? res.tempFileURL : encodeURI(res.tempFileURL)

  return await new Promise((resolve, reject) => {
    const reqOpts = {
      method: 'get',
      url: tmpUrl,
      type: tempFilePath ? 'stream' : 'raw' as 'stream' | 'raw'
    }

    const req = request(reqOpts, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        if (tempFilePath) {
          res.pipe(fs.createWriteStream(tempFilePath, { autoClose: true }))
        }
        if (res.statusCode === 200) {
          resolve({
            fileContent: tempFilePath ? undefined : body,
            message: '文件下载完成'
          })
        } else {
          reject(E({
            ...ERROR.STORAGE_REQUEST_FAIL,
            message: `下载文件失败: Status:${res.statusCode} Url:${tmpUrl}`,
            requestId: res.headers['x-cos-request-id'] as string
          }))
        }
      }
    })

    req.on('error', (err) => {
      if (tempFilePath) {
        fs.unlinkSync(tempFilePath)
      }
      reject(err)
    })
  })
}

export async function getUploadMetadata(cloudbase: CloudBase, { cloudPath }: IGetUploadMetadataOptions, opts?: ICustomReqOpts): Promise<IGetUploadMetadataResult> {
  const params = {
    action: 'storage.getUploadMetadata',
    path: cloudPath,
    method: 'put' // 使用 put 方式上传
  }

  const res = await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json'
    }
  })

  return res
}

export async function getFileAuthority(cloudbase: CloudBase, { fileList }: IGetFileAuthorityOptions, opts?: ICustomReqOpts): Promise<IGetFileAuthorityResult> {
  const { LOGINTYPE } = CloudBase.getCloudbaseContext()
  if (!Array.isArray(fileList)) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '[node-sdk] getCosFileAuthority fileList must be a array'
    })
  }

  if (
    fileList.some(file => {
      if (!file?.path) {
        return true
      }
      if (!['READ', 'WRITE', 'READWRITE'].includes(file.type)) {
        return true
      }
      return false
    })
  ) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '[node-sdk] getCosFileAuthority fileList param error'
    })
  }

  const userInfo = cloudbase.auth().getUserInfo()
  const { openId, uid } = userInfo

  if (!openId && !uid) {
    throw E({
      ...ERROR.INVALID_PARAM,
      message: '[node-sdk] admin do not need getCosFileAuthority.'
    })
  }

  const params = {
    action: 'storage.getFileAuthority',
    openId,
    uid,
    loginType: LOGINTYPE,
    fileList
  }
  const res = await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json'
    }
  })

  if (res.code) {
    /* istanbul ignore next  */
    throw E({ ...res, message: '[node-sdk] getCosFileAuthority failed: ' + res.code })
  } else {
    return res
  }
}

export async function copyFile(cloudbase: CloudBase, { fileList }: ICopyFileOptions, opts?: ICustomReqOpts): Promise<ICopyFileResult> {
  // 参数校验
  if (!fileList || !Array.isArray(fileList) || fileList.length === 0) {
    return processReturn({
      ...ERROR.INVALID_PARAM,
      message: 'fileList必须是非空的数组'
    })
  }
  const list = []

  for (const file of fileList) {
    const { srcPath, dstPath } = file
    if (!srcPath || !dstPath || typeof srcPath !== 'string' || typeof dstPath !== 'string') {
      return processReturn({
        ...ERROR.INVALID_PARAM,
        message: 'srcPath和dstPath必须是非空的字符串'
      })
    }
    if (srcPath === dstPath) {
      return processReturn({
        ...ERROR.INVALID_PARAM,
        message: 'srcPath和dstPath不能相同'
      })
    }
    if (path.basename(srcPath) !== path.basename(dstPath)) {
      return processReturn({
        ...ERROR.INVALID_PARAM,
        message: 'srcPath和dstPath的文件名必须相同'
      })
    }
    list.push({
      src_path: srcPath,
      dst_path: dstPath,
      overwrite: file.overwrite,
      remove_original: file.removeOriginal
    })
  }

  const params = {
    action: 'storage.batchCopyFile',
    file_list: list
  }

  return await tcbapicaller.request({
    config: cloudbase.config,
    params,
    method: 'post',
    opts,
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    if (res.code) {
      return res
    }
    return {
      fileList: res.data.copy_list,
      requestId: res.requestId
    }
  })
}
