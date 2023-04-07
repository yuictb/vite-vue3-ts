import axios from "@/http/index"

//  登录-身份证密码登录
export const loginByIdCard = (params = {}) => {
  return axios.post("/api/examinee/loginByIdCard", params)
}

//  登录-手机号登录
export const loginByPhone = (params = {}) => {
  return axios.post("/api/examinee/loginByPhone", params)
}

//  登录-发送验证码
export const sendCode = (params = {}) => {
  return axios.post("/api/examinee/sendLoginCode", params)
}

//  绑定-绑定手机号
export const bindPhone = (params = {}) => {
  return axios.post("/api/examinee/bindPhone", params)
}

//  绑定-绑定身份证和密码
export const bindCardAndPassWord = (params = {}) => {
  return axios.post("/api/examinee/bindIdCardPassword", params)
}

// 忘记密码
export const resetPsd = (params = {}) => {
  return axios.post("/api/examinee/resetPassword", params)
}
