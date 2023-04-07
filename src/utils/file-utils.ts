import { saveAs } from "file-saver"
import * as _ from "lodash"
const baseFileURL = import.meta.env.VITE_ASSETS_URL
export const isDev = import.meta.env.VITE_NODE_ENV === "development"
/**
 * 下载文件
 * @param url 文件url（相对路径）
 * @param filename  文件名称（不一定可用）
 */
export function downloadFile(url: string, filename: string) {
  url = concatUrl(url)
  if (isIE()) {
    ieDownload(url)
  } else {
    if (filename == null) {
      filename = interceptFileName(url)
    }
    saveAs(url, filename)
  }
}
/**
 * 拼接assets url
 * @param url   assets路径
 * @returns {string|*}
 */
export function concatUrl(url: string) {
  if (url && !url.startsWith("http")) {
    return `${_.trimEnd(baseFileURL, "/")}/${_.trimStart(url, "/")}`
  } else {
    return url
  }
}
const ieDownload = (url: string) => {
  window.open(url)
}
const isIE = () => {
  const explorer = window.navigator.userAgent
  return (
    explorer.indexOf("MSIE") >= 0 ||
    explorer.indexOf("Trident/7.0") >= 0 ||
    explorer.indexOf("Edge") >= 0
  )
}
/**
 * 截取附件url中的文件名
 * @param url 附件url
 * @returns {*|string}  文件名
 */
export function interceptFileName(url: string) {
  const slices = url.split("/")
  return slices[slices.length - 1]
}
export function isAssetTypeAnImage(filePath: string) {
  const index = filePath.lastIndexOf(".")
  const ext = filePath.substring(index + 1, filePath.length)
  return (
    ["png", "jpg", "jpeg", "bmp", "gif", "webp", "psd", "svg", "tiff", "mp4"].indexOf(
      ext.toLowerCase()
    ) !== -1
  )
}

// 获取assets静态资源
export const requireAssets = (url: string) => {
  try {
    return new URL(`../assets/imgs/${url}`, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}

// 富文本处理格式
export const handleHtml = (str: string, isShowPic = true) => {
  let strs
  if (isShowPic) {
    strs = str
      .replace(str ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;nbsp;/g, "\u3000")
  } else {
    strs = str
      .replace(str ? /&(?!#?\w+;)/g : /&/g, "&amp;")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;nbsp;/g, "\u3000")
      .replace(/<\/?(img)[^>]*>/gi, "")
  }
  return strs
}
