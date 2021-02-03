<template>
  <div class="userManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="createBtn" @click="createUser">创建用户</div>
      <el-table :data="tableData" border style="width: 100%" height="91%">
        <el-table-column label="序号" type="index" :index="indexMethod" width="70"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phonenumber" label="手机号"></el-table-column>
        <el-table-column label="操作" class="operationTable">
          <template slot-scope="scope">
            <div class="operationCon">
              <div
                @click="handleEnable(scope.row)"
                class="operation"
              >{{scope.row.status == '0' ? '已启用':'启用'}}</div>
              <div @click="handleEdit(scope.row)" class="operation">编辑</div>
              <div @click="handleDelete(scope.row)" class="operation">删除</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pages.pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pages.pageSize"
        layout="total, prev, pager, next"
        :total="pages.total"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogFormVisible" @close="resetForm">
      <div class="diaContainer">
        <span class="header">{{creatOrEdit[creatOrEditId].title}}</span>
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          align="left"
        >
          <el-form-item label="用户名称：" prop="userName">
            <el-input
              v-model="form.userName"
              placeholder="请输入用户名称"
              size="mini"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="roleIds">
            <el-select
              v-model="form['roleIds']"
              multiple
              size="mini"
              value-key="roleId"
              placeholder="请选择"
              @change="$forceUpdate()"
            >
              <el-option
                v-for="item in options"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
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
          <el-form-item label="手机号：" prop="phonenumber">
            <el-input v-model="form.phonenumber" placeholder="请输入手机号" size="mini"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="myBtn_info diaBtn" @click="resetForm('ruleForm')">取 消</div>
          <div
            class="myBtn_blue diaBtn"
            @click="submitForm('ruleForm')"
          >{{creatOrEdit[creatOrEditId].btn}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteItem } from "@/utils/public";
import {
  getUserList,
  deleteUser,
  getUserInfo,
  editUserState,
  getUserRoleSelect,
  editUserInfo,
  addUser,
  getAllRoleList,
} from "@/api/api";
import { MessageBox, Message } from "@/utils/importFile";
export default {
  data() {
    var checkTel = (rule, value, callback) => {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
      if (this.form.phonenumber == "" || this.form.phonenumber == undefined) {
        callback();
      } else if (!reg.test(this.form.phonenumber)) {
        callback(new Error("手机号码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      creatOrEditId: 0,
      creatOrEdit: [
        {
          title: "创建用户",
          btn: "立即创建",
        },
        {
          title: "修改用户信息",
          btn: "立即修改",
        },
      ],
      //   弹框
      dialogFormVisible: false,
      form: {
        userName: "",
        roleIds: "",
        name: "",
        phonenumber: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phonenumber: [{ validator: checkTel, trigger: "blur" }],
      },
      options: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    async getList() {
      try {
        const { pageNum, pageSize } = this.pages;
        const res = await getUserList({ pageSize, pageNum });
        if (res.code !== 200) return Message.error(res.msg);
        this.tableData = res.rows;
        this.pages.total = res.total;
        /*    res.rows.map((item) => {
          let roleName = [];
          item.roles.map((child) => {
            roleName.push(child.roleName);
          });
          item.roleName = roleName.join(" / ");
        }); */
      } catch (error) {
        console.log(error);
      }
    },
    // 删除用户
    async deleteUser(id) {
      try {
        const res = await deleteUser(id);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("删除成功");
        this.pages.pageNum = 1;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 获取个人信息
    async getUserInfo(id) {
      try {
        const res = await getUserInfo(id);
        if (res.code !== 200) return Message.error(res.msg);
        const { name, userName, phonenumber, userId } = res.data;
        this.form = { name, userName, phonenumber, userId };
      } catch (error) {
        console.log(error);
      }
    },
    // 修改用户状态
    async editUserState(id, status) {
      try {
        const res = await editUserState({ userId: id, status });
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("修改成功");
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 获取用户可选角色
    async getUserRoleSelect(id) {
      try {
        const res = await getUserRoleSelect(id);
        if (res.code !== 200) Message.error(res.msg);
        this.options = res.roles;
        this.form.roleIds = res.checkedRoles;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    // 创建用户 // 修改用户信息
    async addUser(form) {
      try {
        // creatOrEditId :  0 创建 1 修改
        const res = this.creatOrEditId
          ? await editUserInfo(form)
          : await addUser(form);
        if (res.code !== 200) return Message.error(res.msg);
        let message = this.creatOrEditId ? "修改成功" : "添加成功";
        Message.success(message);
        this.dialogFormVisible = false;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 获取所有角色列表
    async getAllRoleList() {
      try {
        const res = await getAllRoleList();
        if (res.code !== 200) return Message.error(res.msg);
        this.options = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    // 创建用户
    createUser() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
      this.getAllRoleList();
    },
    // 启用
    handleEnable(row) {
      MessageBox.confirm("此操作将修改用户状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row);
          let status = row.status == "0" ? "1" : "0";
          this.editUserState(row.userId, status);
        })
        .catch(() => {
          Message.info("已取消修改");
        });
    },
    // 编辑
    handleEdit(row) {
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      this.getUserInfo(row.userId);
      this.getUserRoleSelect(row.userId);
    },
    // 删除
    handleDelete(row) {
      deleteItem(() => {
        this.deleteUser(row.userId);
      });
    },
    // 重置表单
    resetForm() {
      this.dialogFormVisible = false;
      this.form = {
        userName: "",
        role: "",
        name: "",
        phonenumber: "",
      };
      this.$refs.ruleForm.resetFields();
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表格序号
    indexMethod(index) {
      const { pageNum, pageSize } = this.pages;
      return index + 1 + (pageNum - 1) * pageSize; // 返回表格序号
    },
    //   分页
    handleCurrentChange(val) {
      this.pages.pageNum = val;
      this.getList();
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