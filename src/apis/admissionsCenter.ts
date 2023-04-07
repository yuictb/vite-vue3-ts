import axios from "@/http/index"

// /admissions-api/examinee/admissionsCenter/queryAdmissionsPlanList
export const queryAdmissionsPlanList = (params = {}) => {
  return axios.post("/api/examinee/admissionsCenter/queryAdmissionsPlanList", params)
}

// /admissions-api/examinee/admissionsCenter/queryAdmissionsPostList
export const queryAdmissionsPostList = (params = {}) => {
  return axios.post("/api/examinee/admissionsCenter/queryAdmissionsPostList", params)
}

// 招考计划--查询报名须知
export const queryAdmissionsNotice = (params = {}) => {
  return axios.post("/api/examinee/admissionsCenter/queryAdmissionsNotice", params)
}
