import { reactive } from "vue"
import { defineStore } from "pinia"
import { getUserInfo } from "@/utils/app-util"
export const useUserInfo = defineStore("counter", () => {
  const info = reactive({
    detail: getUserInfo()
  })
  async function setInfo(payload: any) {
    info.detail = await payload
  }

  return { info, setInfo }
})
