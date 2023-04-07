<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-bind="$attrs"
      :current-page="pagination.pageNo"
      :page-size="pagination.pageSize"
      background
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
interface PaginationTy {
  pageSize: number
  pageNo: number
}

interface Test {
  total: number
  layout?: string
  pagination: PaginationTy
}
const props = withDefaults(defineProps<Test>(), {
  total: () => 0,
  layout: () => "total, sizes, prev, pager, next, jumper",
  pagination: () => ({ pageSize: 10, pageNo: 1 })
})
const emits = defineEmits(["update:pagination", "getData"])
const handleSizeChange = (val: number) => {
  props.pagination.pageSize = val
  emits("update:pagination", props.pagination)
  emits("getData")
}
const handleCurrentChange = (val: number) => {
  props.pagination.pageNo = val
  emits("update:pagination", props.pagination)
  emits("getData")
}
</script>
