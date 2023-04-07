import { reactive } from "vue"
import { defineStore } from "pinia"

export const setHomeHeaderTitle = defineStore("te", () => {
  const content = reactive({
    setFlag: false,
    contentTitle: ""
  })

  return { content }
})
