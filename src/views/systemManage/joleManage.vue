
<template>
  <div class="joleManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="myBtn littleBtn myBtn_blue" @click="dialogFormVisible = true">创建角色</div>
      <el-table :data="tableData" border style="width: 100%" height="91%">
        <el-table-column label="序号" type="index" width="70"></el-table-column>
        <el-table-column prop="date" label="角色名称"></el-table-column>
        <el-table-column prop="name" label="角色描述"></el-table-column>
        <el-table-column label="操作" class="operationTable">
          <template slot-scope="scope">
            <div class="operationCon">
              <div @click="handleEdit(scope.$index, scope.row)" class="operation">编辑</div>
              <div @click="handleEdit(scope.$index, scope.row)" class="operation">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="400"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <div class="diaContainer">
        <span class="header">创建用户</span>
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          align="left"
        >
          <el-form-item label="角色名称：" prop="nickName">
            <el-input
              v-model="form.nickName"
              size="mini"
              placeholder="请输入角色名称"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述：">
            <el-input
              v-model="form.name"
              type="textarea"
              placeholder="请输入角色描述"
              size="mini"
              maxlength="120"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="权限字符：" prop="nickName">
            <el-input
              v-model="form.nickName"
              size="mini"
              placeholder="请输入权限字符"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="权限配置：" prop="nickName">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="myBtn myBtn_info littleBtn myBtn_middle" @click="resetForm('ruleForm')">取 消</div>
          <div class="myBtn myBtn_blue littleBtn myBtn_middle" @click="submitForm('ruleForm')">立即创建</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/assets/css/editElementStyle.css";
export default {
  data() {
    return {
      currPage: 1,
      pageSize: 10,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      //   弹框
      dialogFormVisible: false,
      form: {
        nickName: "",
        name: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
      },
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    setCheckedNodes() {
      console.log(this.$refs);
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "二级 2-1",
        },
        {
          id: 9,
          label: "三级 1-1-1",
        },
      ]);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang='less' scoped >
.joleManage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .mainContainer {
    flex: 1;
    border-radius: 2px;
    padding: 15px;
    text-align: left;
    border: 1px solid #f0f2f5;
    .el-table {
      margin-top: 10px;
    }

    .operationCon {
      display: flex;
      .operation {
        flex: 1;
        &:nth-child(1) {
          color: #2d3291;
        }
        &:nth-child(2) {
          color: #ff4a00;
        }
      }
    }
  }
  .pagination {
    padding: 10px;
    text-align: right;
    padding-bottom: 0;
  }
  .diaContainer {
    text-align: left;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
    padding: 15px;
    position: relative;
    min-height: 475px;
    .header {
      font-weight: 700;
      display: inline-block;
      margin-bottom: 15px;
      color: #333;
    }
    .dialog-footer {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
<style lang="less">
.joleManage {
  .el-dialog__header {
    padding: 0 20px 0px;
  }
  .el-dialog__headerbtn {
    top: 8px;
  }
  .el-dialog {
    width: 85%;
    margin-top: 9vh !important;
    .el-form {
      width: 50%;
      height: 92%;
    }
  }
}
</style>