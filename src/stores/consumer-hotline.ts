import { reactive } from "vue"
import { defineStore } from "pinia"
export const telPhoneList = defineStore("telList", () => {
  const content = reactive({
    show: "",
    data: []
  })
  async function setData(payload: any) {
    content.data = await payload
  }

  return { content, setData }
})
