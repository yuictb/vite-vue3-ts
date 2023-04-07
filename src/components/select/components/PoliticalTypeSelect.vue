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
  { value: 1, label: "群众" },
  { value: 2, label: "共青团员" },
  { value: 3, label: "中共预备党员" },
  { value: 4, label: "中共党员" },
  { value: 5, label: "民革党员" },
  { value: 6, label: "民工党党员" },
  { value: 7, label: "致公党党员" },
  { value: 8, label: "九三学社社员" },
  { value: 9, label: "台盟盟员" }
])
</script>

<style lang="less" scoped></style>
