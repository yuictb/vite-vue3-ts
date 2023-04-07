<template>
  <el-table-column
    v-bind="$attrs"
    :align="align"
    :fixed="fixed"
    :label="labelName"
    class-name="operation-column"
  >
    <template v-slot="data">
      <slot v-bind="data"></slot>
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
  fixed: {
    type: String,
    default() {
      return "right"
    }
  },
  labelName: {
    type: String,
    default() {
      return ""
    }
  }
})
</script>

<style lang="less" scoped></style>
