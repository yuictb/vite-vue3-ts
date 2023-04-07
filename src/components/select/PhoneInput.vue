<!--手机号输入框-->
<!-- 基础版 -->
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
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (event.target.value && !reg.test(event.target.value)) {
    Emits("update:model-value", null)
    ElMessage.warning("手机号格式不正确")
  }
}
</script>

<!-- 加强版本 -->
<!-- <template>
  <el-input @blur="valueBlur" v-bind="$attrs"></el-input>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus"
import { useAttrs } from "vue"

const attrs = useAttrs()

// eslint-disable-next-line no-unused-vars
type fn = (val: string | null) => void

const valueBlur = (event: any) => {
  let reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (event.target.value && !reg.test(event.target.value)) {
    ;(attrs["onUpdate:modelValue"] as fn)(null)
    ElMessage.warning("手机号格式不正确")
  }
}
</script> -->

<style lang="less" scoped></style>
