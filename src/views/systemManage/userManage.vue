<template>
  <div class="userManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="createBtn" @click="createUser">创建用户</div>
      <sysTable
        :tableHeader="tableHeader"
        :tableData="tableData"
        :pages="pages"
        @handleEnable="handleEnable"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      ></sysTable>
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
              v-model.trim="form.userName"
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
              style="width:100%"
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
              v-model.trim="form.name"
              size="mini"
              maxlength="20"
              placeholder="请输入姓名"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phonenumber">
            <el-input v-model.trim.number="form.phonenumber" placeholder="请输入手机号" size="mini"></el-input>
          </el-form-item>
          <el-form-item v-if="!creatOrEditId" label="密码：" prop="password">
            <el-input
              v-model.trim.number="form.password"
              maxlength="18"
              placeholder="请输入密码"
              size="mini"
            ></el-input>
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
import sysTable from "./sysTable";
import {
  _getList,
  _delete,
  _getInfo,
  _editStatus,
  _getSelect,
  _addItem,
  deleteItem,
} from "@/utils/requestApi";
export default {
  components: {
    sysTable,
  },
  data() {
    var checkTel = (rule, value, callback) => {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
      if (!reg.test(this.form.phonenumber)) {
        callback(new Error("手机号码格式不正确"));
      } else {
        callback();
      }
    };
    var checkPsw = (rule, value, callback) => {
      var reg = /^[a-zA-Z]\w{5,18}$/;
      if (!reg.test(this.form.password)) {
        callback(
          new Error("以字母开头，长度在6-18之间，只能包含字符、数字和下划线")
        );
      } else {
        callback();
      }
    };
    return {
      tableHeader: [
        { id: 1, label: "用户名", prop: "userName" },
        { id: 2, label: "姓名", prop: "name" },
        { id: 3, label: "手机号", prop: "phonenumber" },
      ],
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
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phonenumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            validator: checkPsw,
            trigger: "blur",
          },
        ],
      },
      options: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      const { pageNum, pageSize } = this.pages;
      let data = { pageSize, pageNum };
      _getList(getUserList, data, (res) => {
        this.tableData = res.rows;
        this.pages.total = res.total;
      });
    },
    // 创建用户 // 修改用户信息
    addUser(form) {
      const requestApi = this.creatOrEditId ? editUserInfo : addUser;
      _addItem(requestApi, form, () => {
        this.dialogFormVisible = false;
        let message = this.creatOrEditId ? "修改成功" : "添加成功";
        Message.success(message);
        this.getList();
      });
    },
    // 创建用户
    createUser() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
      _getSelect(getAllRoleList, {}, (res) => {
        this.options = res.data;
      });
    },
    // 启用
    handleEnable(row) {
      MessageBox.confirm("此操作将修改用户状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let status = row.status == "0" ? "1" : "0";
          let data = { userId: row.userId, status };
          _editStatus(editUserState, data, () => {
            this.getList();
          });
        })
        .catch(() => {
          Message.info("已取消修改");
        });
    },
    // 编辑
    handleEdit(row) {
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      _getInfo(getUserInfo, row.userId, (res) => {
        const { name, userName, phonenumber, userId, password } = res.data;
        this.form = { name, userName, phonenumber, userId, password };
      });
      _getSelect(getUserRoleSelect, row.userId, (res) => {
        this.options = res.roles;
        this.form.roleIds = res.checkedRoles;
      });
    },
    // 删除
    handleDelete(row) {
      deleteItem(() => {
        _delete(deleteUser, this.pages, row.userId, (flag) => {
          if (flag) this.pages.pageNum--;
          this.getList();
        });
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
    top: 1px;
  }
  .el-dialog {
    margin-top: 9vh !important;
    width: 85%;
    .el-form {
      width: 50%;
      height: 92%;
    }
  }
  .el-select .el-input {
    width: 100%;
  }
}
</style>