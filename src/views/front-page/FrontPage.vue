<template>
  <div>首页</div>
  <el-button type="primary" @click="ElMessage.success('成功')">点击</el-button>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus"
</script>
