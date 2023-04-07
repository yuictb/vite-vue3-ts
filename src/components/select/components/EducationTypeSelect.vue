<template>
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
  { value: 8, label: "博士" },
  { value: 7, label: "硕士" },
  { value: 6, label: "本科" },
  { value: 5, label: "大专" },
  { value: 4, label: "中专" },
  { value: 3, label: "职高" },
  { value: 2, label: "高中" },
  { value: 1, label: "初中" },
  { value: 0, label: "小学" }
])
</script>

<style lang="less" scoped></style>
