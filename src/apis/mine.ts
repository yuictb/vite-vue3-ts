import axios, { post } from "@/http/index"

// 退出登录
export const loginOut = (params = {}) => {
  return axios.post("/api/examinee/logout", params)
}

// 缴费--查询缴费分页列表
export const queryPayOrderPageApi = (params = {}) => {
  return axios.post("/api/examinee/pay/queryPayOrderPage", params)
}

// 缴费--发起支付
export const payApi = (params = {}) => {
  return axios.post("/api/examinee/pay/pay", params)
}

// 缴费--查询支付状态
export const queryPayStatusApi = (params = {}) => {
  return post("/api/examinee/pay/queryPayStatus", params, false, true)
}
