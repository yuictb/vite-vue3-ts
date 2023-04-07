<!--身份证输入框-->
<template>
  <el-input @blur="valueBlur" v-bind="$attrs" @input="input"></el-input>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"

const Emits = defineEmits(["update:model-value"])

const input = (event: any) => {
  // console.log(event)
  Emits("update:model-value", event)
}

const valueBlur = (event: any) => {
  let reg1 = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ // 18位
  let reg2 = /^[1-9]\d{5}\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/ // 15位
  if (event.target.value && !(reg1.test(event.target.value) || reg2.test(event.target.value))) {
    Emits("update:model-value", null)
    ElMessage.warning("身份证格式不正确")
  }
}
</script>

<style lang="less" scoped></style>
