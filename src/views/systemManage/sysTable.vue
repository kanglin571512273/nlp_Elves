<template>
  <el-table :data="tableData" border style="width: 100%" height="91%">
    <el-table-column label="序号" type="index" :index="indexMethod" width="70"></el-table-column>
    <el-table-column
      v-for="item in tableHeader"
      :key="item.ids"
      :prop="item.prop"
      :label="item.label"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="操作" class="operationTable">
      <template slot-scope="scope">
        <div class="operationCon">
          <div
            v-show="$route.name == 'userManage'"
            @click="handleClick(scope.row,1)"
            class="operation"
          >{{scope.row.status == '0' ? '已启用':'启用'}}</div>
          <div @click="handleClick(scope.row,2)" class="operation">编辑</div>
          <div @click="handleClick(scope.row,3)" class="operation">删除</div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableHeader: { type: Array, default: () => {} },
    tableData: { type: Array, default: () => {} },
    pages: { type: Object, default: () => {} },
  },
  methods: {
    indexMethod(index) {
      const { pageNum, pageSize } = this.pages;
      return index + 1 + (pageNum - 1) * pageSize; // 返回表格序号
    },
    handleClick(row, index) {
      let arr = ["handleEnable", "handleEdit", "handleDelete"];
      this.$emit(arr[index - 1], row);
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 10px;
}

.operationCon {
  display: flex;
  cursor: pointer;
  .operation {
    flex: 1;
    &:nth-child(1) {
      color: #00a195;
    }
    &:nth-child(2) {
      color: #2d3291;
    }
    &:nth-child(3) {
      color: #ff4a00;
    }
  }
}
</style>