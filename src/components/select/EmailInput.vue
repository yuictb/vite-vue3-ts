<!--邮箱输入框-->
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
  let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
  if (event.target.value && !reg.test(event.target.value)) {
    Emits("update:model-value", null)
    ElMessage.warning("手机号格式不正确")
  }
}
</script>

<style lang="less" scoped></style>
