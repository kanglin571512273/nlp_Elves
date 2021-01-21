<template>
  <div class="robot">
    <div>
      <el-card class="box-card">
        <el-table :data="tableData" boolean style="width: 100%">
          <el-table-column prop="serial" label="序号" width="180">
          </el-table-column>
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="类型" width="180">
          </el-table-column>
           <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Card } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Card);
export default {
  data() {
    return {
      tableData: [
        {
          serial: 1,
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          serial: 2,
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          serial: 3,
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          serial: 4,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style></style>
