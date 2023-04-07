<template>
  <el-table-column v-bind="$attrs" :align="align" show-overflow-tooltip>
    <template #default="scope">
      <slot v-bind="scope">{{ scope.row[prop] }}</slot>
    </template>
  </el-table-column>
</template>

<script lang="ts" setup>
defineProps({
  align: {
    type: String,
    default() {
      return "center"
    }
  },
  prop: {
    type: String,
    default() {
      return ""
    }
  }
})
</script>

<style lang="less" scoped></style>
