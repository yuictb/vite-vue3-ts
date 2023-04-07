import axios from "@/http/index"

// 查询自定义阶段数据
export const queryCustomStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryCustomStage", params)
}

// 查询面试阶段数据
export const queryInterViewStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryInterViewStage", params)
}

// 查询缴费阶段数据
export const queryPayState = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryPayStage", params)
}

// 查询资格审核阶段数据
export const queryQualificationStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryQualificationStage", params)
}

// 查询基本信息
export const querySignUpInfoStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/querySignUpInfoStage", params)
}

// 查询总成绩反馈阶段阶段数据
export const queryTotalScoreStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryTotalScoreStage", params)
}

// 查询笔试阶段数据
export const queryWrittenStage = (params = {}) => {
  return axios.post("/api/examinee/enroll/queryWrittenStage", params)
}
// 虚拟支付
export const handlePay = (params = {}) => {
  return axios.post("/api/examinee/enroll/pay", params)
}
