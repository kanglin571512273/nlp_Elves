
<template>
  <div class="joleManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="createBtn" @click="createRole">创建角色</div>
      <sysTable
        :tableHeader="tableHeader"
        :tableData="tableData"
        :pages="pages"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
      ></sysTable>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pages.currPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pages.pageSize"
        layout="total, prev, pager, next"
        :total="pages.total"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogFormVisible" @close="resetForm">
      <div class="diaContainer">
        <span class="header">{{ creatOrEdit[creatOrEditId].title}}</span>
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          align="left"
        >
          <el-form-item label="角色名称：" prop="roleName">
            <el-input
              v-model.trim="form.roleName"
              size="mini"
              placeholder="请输入角色名称"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="角色描述：">
            <el-input
              v-model.trim="form.roleDesc"
              type="textarea"
              placeholder="请输入角色描述"
              size="mini"
              maxlength="120"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="权限字符：" prop="roleKey">
            <el-input
              v-model.trim="form.roleKey"
              size="mini"
              placeholder="请输入权限字符"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="权限配置：" prop="menuIds">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              default-expand-all
              node-key="menuId"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="defaultCheckedKey"
            ></el-tree>
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
  getRoleList,
  deleteRole,
  getAuthAndChoosed,
  getRoleInfo,
  addRoleInfo,
  getAuthList,
  editRoleInfo,
} from "@/api/api";
import { deleteItem } from "@/utils/requestApi";
import { Message } from "@/utils/importFile";
import {
  _getList,
  _delete,
  _getInfo,
  _getSelect,
  _addItem,
} from "@/utils/requestApi";
import sysTable from "./sysTable";
export default {
  components: {
    sysTable,
  },
  data() {
    const checkRoleKey = (rule, value, callback) => {
      var reg = /[\u4e00-\u9fa5]/;
      var reg1 = /[0-9]/;
      if (this.form.roleKey == "" || this.form.roleKey == undefined) {
        callback();
      } else if (reg.test(this.form.roleKey)) {
        callback(new Error("请不要输入文字"));
      } else if (reg1.test(this.form.roleKey)) {
        callback(new Error("请不要输入数字"));
      } else {
        callback();
      }
    };
    return {
      tableHeader: [
        { id: 1, label: "角色名称", prop: "roleName" },
        { id: 2, label: "权限字符", prop: "roleKey" },
        { id: 3, label: "角色描述", prop: "roleDesc" },
      ],
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      creatOrEditId: 0,
      creatOrEdit: [
        {
          title: "创建角色",
          btn: "立即创建",
        },
        {
          title: "修改角色信息",
          btn: "立即修改",
        },
      ],
      tableData: [],
      //   弹框
      dialogFormVisible: false,
      form: {
        roleName: "",
        roleDesc: "",
        roleKey: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleKey: [
          { required: true, message: "请输入权限字符", trigger: "blur" },
          { validator: checkRoleKey, trigger: "blur" },
        ],
      },
      data: [],
      defaultCheckedKey: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
    };
  },
  mounted() {
    this.getList();
    this.getAuthList();
  },
  methods: {
    // 获取角色列表
    getList() {
      const { pageNum, pageSize } = this.pages;
      let data = { pageSize, pageNum };
      _getList(getRoleList, data, (res) => {
        this.tableData = res.rows;
        this.pages.total = res.total;
      });
    },
    // 获取权限列表
    getAuthList() {
      _getSelect(getAuthList, {}, (res) => {
        this.data = res.data;
      });
    },
    // 添加  /  修改用户
    addRole(form) {
      let menuIds = this.$refs.tree.getCheckedKeys();
      form = { ...form, menuIds };
      const requestApi = this.creatOrEditId ? editRoleInfo : addRoleInfo;
      _addItem(requestApi, form, () => {
        this.dialogFormVisible = false;
        let message = this.creatOrEditId ? "修改成功" : "添加成功";
        Message.success(message);
        this.getList();
      });
    },
    // 创建角色
    createRole() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
    },
    // 编辑
    handleEdit(row) {
      console.log(row);
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      _getInfo(getRoleInfo, row.roleId, (res) => {
        this.form = res.data;
      });
      _getSelect(getAuthAndChoosed, row.roleId, (res) => {
        this.defaultCheckedKey = res.checkedMenus;
      });
    },
    // 删除
    handleDelete(row) {
      deleteItem(() => {
        _delete(deleteRole, this.pages, row.roleId, (flag) => {
          if (flag) this.pages.pageNum--;
          this.getList();
        });
      });
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addRole(this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.dialogFormVisible = false;
      this.form = {
        roleName: "",
        roleDesc: "",
        roleKey: "",
      };
      this.$refs.tree.setCheckedKeys([]); //树结构清空
      this.$refs.ruleForm.resetFields(); //校验样式清空
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
    top: 1px;
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