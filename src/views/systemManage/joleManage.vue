
<template>
  <div class="joleManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="createBtn" @click="createRole">创建角色</div>
      <el-table :data="tableData" border style="width: 100%" height="91%" empty-text="暂无">
        <el-table-column label="序号" :index="indexMethod" type="index" width="70"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleKey" label="权限字符"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" class="operationTable">
          <template slot-scope="scope">
            <div class="operationCon">
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
import { deleteItem } from "@/utils/public";
import { Message } from "@/utils/importFile";
export default {
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
    async getList() {
      try {
        const { pageNum, pageSize } = this.pages;
        const res = await getRoleList({ pageSize, pageNum });
        if (res.code !== 200) return Message.error(res.msg);
        this.tableData = res.rows;
        this.pages.total = res.total;
      } catch (error) {
        console.log(error);
      }
    },
    // 删除角色
    async deleteRole(id) {
      try {
        const res = await deleteRole(id);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("删除成功");
        this.pages.pageNum = 1;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 获取权限列表及选中权限
    async getAuthAndChoosed(id) {
      try {
        const res = await getAuthAndChoosed(id);
        if (res.code !== 200) Message.error(res.msg);
        this.defaultCheckedKey = res.checkedMenus;
        // this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取权限列表
    async getAuthList() {
      try {
        const res = await getAuthList();
        if (res.code !== 200) Message.error(res.msg);
        this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取角色信息
    async getRoleInfo(id) {
      try {
        const res = await getRoleInfo(id);
        if (res.code !== 200) Message.error(res.msg);
        this.form = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    // 添加  /  修改用户
    async addRole(form) {
      try {
        let menuIds = this.$refs.tree.getCheckedKeys();
        form = { ...form, menuIds };
        // creatOrEditId :  0 创建 1 修改
        const res = this.creatOrEditId
          ? await editRoleInfo(form)
          : await addRoleInfo(form);
        if (res.code !== 200) return Message.error(res.msg);
        let message = this.creatOrEditId ? "修改成功" : "添加成功";
        Message.success(message);
        this.dialogFormVisible = false;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 创建角色
    createRole() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
    },
    // 编辑
    handleEdit(row) {
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      this.getRoleInfo(row.roleId);
      this.getAuthAndChoosed(row.roleId);
    },
    // 删除
    handleDelete(row) {
      deleteItem(() => {
        this.deleteRole(row.roleId);
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