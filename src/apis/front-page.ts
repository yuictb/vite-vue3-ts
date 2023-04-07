import axios from "@/http/index"

// 招考计划-查询首页招考计划列表
export const queryAdmissPlan = (params = {}) => {
  return axios.post("/api/examinee/homePage/queryAdmissionsPlan", params)
}

//  招考计划-查询首页招考岗位列表
export const queryAdmissPostList = (params = {}) => {
  return axios.post("/api/examinee/homePage/queryAdmissionsPostList", params)
}

//  报名
export const clickEnroll = (params = {}) => {
  return axios.post("/api/examinee/enroll/enroll", params)
}

// 查询报名须知
export const queryAdNotice = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryAdmissionsNotice", params)
}

// 查询岗位投递信息
export const queryDelivery = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryDelivery", params)
}

// 查询岗位投递阶段信息
export const queryDeliveryInfo = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryDeliveryInfo", params)
}

// 查询报名表
export const querySignUpT = (params = {}) => {
  return axios.post("/api/examinee/enroll/querySignUpTable", params)
}

// 客服电话
export const queryCustomPhoneList = (params = {}) => {
  return axios.post("/api/examinee/homePage/queryCustomerPhoneList", params)
}

// 流程示意图
export const queryProcessShowData = (params = {}) => {
  return axios.post("/api/examinee/homePage/queryProcessShowData", params)
}

// 公告列表
export const querySiteAnnouncementList = (params = {}) => {
  return axios.post("/api/examinee/homePage/querySiteAnnouncementList", params)
}

// 查询注意事项
export const queryAttentionList = (params = {}) => {
  return axios.post("/api/examinee/homePage/queryAttentionList", params)
}

// 获取招考系统网站设置
export const getProSysPro = (params = {}) => {
  return axios.post("/api/examinee/homePage/getSysProperties", params)
}
