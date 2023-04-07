<template>
  <div>
    <!--表格-->
    <el-table
      v-bind="$attrs"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="displayTableData"
    >
      <!--选择列-->
      <el-table-column v-if="selectionColumn" type="selection" width="50" align="center" />
      <!--序号列-->
      <!-- <el-table-column
        v-if="indexColumn"
        label="序号"
        type="index"
        :index="_generateIndex"
        width="50"
        align="center"
      /> -->
      <!--数据列-->
      <slot></slot>
      <!--分页-->
    </el-table>
    <!-- <el-pagination
      @size-change="_handleSizeChange"
      v-if="ifShowPagination"
      @current-change="_handleCurrentChange"
      v-bind="$attrs"
      :layout="layoutPagination"
      :current-page="pagination.pageNo"
      :page-size="pagination.pageSize"
    /> -->
    <Pagination
      @size-change="_handleSizeChange"
      v-if="ifShowPagination"
      @current-change="_handleCurrentChange"
      v-bind="$attrs"
      small
      :layout="layoutPagination"
      :current-page="pagination.pageNo"
      :page-size="pagination.pageSize"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue"
import Pagination from "@/components/pagination/Pagination.vue"

const props = defineProps({
  fitHeight: {
    type: Boolean
  },
  data: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  indexColumn: {
    type: Boolean,
    default() {
      return false
    }
  },
  selectionColumn: {
    type: Boolean,
    default() {
      return false
    }
  },
  pagination: {
    type: Object,
    default() {
      return {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  ifShowPagination: {
    default() {
      return true
    }
  },
  showSum: {
    type: Boolean,
    default() {
      return false
    }
  },
  layoutPagination: {
    default() {
      return "total, sizes, prev, pager, next, jumper"
    }
  }
})

const Emits = defineEmits(["update:ids", "update:status", "update:pagination", "page-change"])

const displayTableData = computed(() => {
  if (!props.ifShowPagination) {
    return props.data
  }
  if (props.showSum) {
    return props.data
  }
  return props.data.slice(0, props.pagination.pageSize || 10)
})

// const tableHeight = ref<number | undefined>(undefined)

const articleIds = ref<any[]>([])

const status = ref<any[]>([])

const handleSelectionChange = (val: any[]) => {
  articleIds.value = []
  status.value = []
  val.forEach((v) => {
    articleIds.value.push(v.articleId)
    status.value.push(v.articleStatus)
  })
  Emits("update:ids", articleIds.value)
  Emits("update:status", status.value)
}

// const _generateIndex = (index: number) => {
//   let { pageSize, pageNo } = props.pagination
//   // console.log(props.pagination)
//   return (pageNo - 1) * pageSize + index + 1
// }

const _handleSizeChange = (size: number) => {
  // console.log(size)
  let pagination = { pageNo: props.pagination.pageNo, pageSize: size }
  Emits("update:pagination", pagination)
  Emits("page-change", pagination)
}

const _handleCurrentChange = (pageNo: number) => {
  let pagination = {
    pageNo: pageNo,
    pageSize: props.pagination.pageSize
  }
  Emits("update:pagination", pagination)
  Emits("page-change", pagination)
}
</script>

<style lang="less" scoped>
.data-table {
  margin-top: 16px;

  .el-table {
    box-shadow: 0 0 1px 1px #bbb2c0;
  }

  &.fit {
    flex: 1;
    overflow-y: hidden;
  }

  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
