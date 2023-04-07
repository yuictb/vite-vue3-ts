<template>
  <!--  状态 -->
  <el-select v-bind="$attrs" clearable>
    <el-option
      v-for="item in options"
      :value="item.value"
      :label="item.label"
      :key="item.value"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from "vue"
const options = ref([
  { value: "0", label: "停用" },
  { value: "1", label: "在用" }
])
</script>

<style lang="less" scoped></style>
