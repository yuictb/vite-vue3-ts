<template>
  <div
    class="text-center text-white w-48px h-48px rounded-50% leading-48px bg-blue"
    @click="ElMessage.success('成功')"
  >
    首页
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus"
</script>
