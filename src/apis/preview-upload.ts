import axios from "@/http/index"

// 提交信息

export const submitInfo = (params = {}) => {
  return axios.post("/api/examinee/enroll/submitSignUpInfo", params)
}
