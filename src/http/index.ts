import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { ElLoading, ElMessage } from "element-plus"
import { proxyReplace } from "./proxyReplace"
import pinia from "@/stores"
import { useUserInfo } from "@/stores/userInfo"

const userInfo = useUserInfo(pinia)
const { info } = userInfo

axios.defaults.withCredentials = true
axios.defaults.timeout = 5 * 1000
let loading: any
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data.noLoading) {
      delete config.data.noLoading
    } else {
      loading = ElLoading.service({
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)"
      })
    }
    config.url = proxyReplace(config.url)
    config.headers["authorization"] = info.detail?.token || ""
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (loading) {
      loading.close()
    }
    const { status, data } = response
    if (status >= 200 && status < 300) {
      return Promise.resolve(data)
    } else {
      ElMessage.error(data.msg || "请求信息错误")
      return Promise.reject(data.msg)
    }
  },
  (error) => {
    if (loading) {
      loading.close()
    }
    if (error.response) {
      let msg
      switch (error.response.status) {
        case 403:
          msg = "登录信息已过期,请重新登录"
          break
        case 404:
          msg = "接口请求不存在!错误码【404】。"
          break
        case 500:
          msg = error.response.data.message || "服务端应用接口异常!错误码【500】。"
          break
        default:
          msg = "请求错误，请检查或刷新重试！"
          break
      }
      ElMessage.error(msg)
    } else {
      ElMessage.error("服务不可用")
    }
    return Promise.reject(error)
  }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} isFormData [true：FormData格式请求头；false：json格式请求头]
 * @param {Boolean} noLoading [true：不展示loading框；false：展示loading框]
 */
export function post(url: string, params: any, isFormData = false, noLoading = false) {
  // json格式请求头
  const headerJSON = {
    "Content-Type": "application/json"
  }
  // FormData格式请求头
  const headerFormData = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
  if (noLoading) {
    params.noLoading = noLoading
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: isFormData ? headerFormData : headerJSON
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default axios
