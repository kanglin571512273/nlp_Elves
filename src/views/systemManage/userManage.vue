<template>
  <div class="userManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="myBtn littleBtn myBtn_blue" @click="dialogFormVisible = true">创建用户</div>
      <el-table :data="tableData" border style="width: 100%" height="91%">
        <el-table-column label="序号" type="index" width="70"></el-table-column>
        <el-table-column prop="date" label="用户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="角色"></el-table-column>
        <el-table-column prop="address" label="手机号"></el-table-column>
        <el-table-column label="操作" class="operationTable">
          <template slot-scope="scope">
            <div class="operationCon">
              <div @click="handleEdit(scope.$index, scope.row)" class="operation">启用</div>
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
          <el-form-item label="用户名称：" prop="nickName">
            <el-input
              v-model="form.nickName"
              placeholder="请输入用户名称"
              size="mini"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="jole">
            <el-select v-model="form.jole" size="mini" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input
              v-model="form.name"
              size="mini"
              maxlength="20"
              placeholder="请输入姓名"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入手机号" size="mini"></el-input>
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
    var checkTel = (rule, value, callback) => {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
      if (this.form.tel == "" || this.form.tel == undefined) {
        callback();
      } else if (!reg.test(this.form.tel)) {
        callback(new Error("手机号码格式不正确"));
      } else {
        callback();
      }
    };
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
        jole: "",
        name: "",
        tel: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        jole: [{ required: true, message: "请选择角色", trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
      },
      options: [
        {
          value: "1",
          label: "管理员",
        },
        {
          value: "2",
          label: "普通用户",
        },
      ],
    };
  },
  methods: {
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
.userManage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .mainContainer {
    flex: 1;
    border-radius: 2px;
    padding: 15px;
    border: 1px solid #f0f2f5;
    text-align: left;
    .el-table {
      margin-top: 10px;
    }

    .operationCon {
      display: flex;
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
  }
  .pagination {
    padding: 10px;
    text-align: right;
    padding-bottom: 0;
    cursor: pointer;
  }
  .diaContainer {
    text-align: left;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
    min-height: 475px;
    padding: 15px;
    position: relative;
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
.userManage {
  .el-select {
    width: 100%;
  }
  .el-dialog__header {
    padding: 0 20px 0px;
  }
  .el-dialog__headerbtn {
    top: 8px;
  }
  .el-dialog {
    margin-top: 9vh !important;
    width: 85%;
    .el-form {
      width: 50%;
      height: 92%;
    }
  }
}
</style>