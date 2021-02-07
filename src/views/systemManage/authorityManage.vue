
<template>
  <div class="authorityManage">
    <!-- 展示区  -->
    <div class="mainContainer">
      <div class="createBtn" @click="createAuth">创建权限</div>
      <el-table :data="tableData" border style="width: 100%" height="91%">
        <el-table-column label="序号" :index="indexMethod" type="index" width="70"></el-table-column>
        <el-table-column prop="menuName" label="权限名称"></el-table-column>
        <el-table-column prop="menuDesc" label="权限描述" show-overflow-tooltip></el-table-column>
        <el-table-column prop="path" label="路由"></el-table-column>
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
        :current-page="pages.pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pages.pageSize"
        layout="total, prev, pager, next"
        :total="pages.total"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
      <!-- <span>创建用户</span> -->
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
          <el-form-item label="权限名称：" prop="menuName">
            <el-input
              v-model.trim="form.menuName"
              size="mini"
              placeholder="请输入权限名称"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="权限描述：">
            <el-input
              v-model.trim="form.menuDesc"
              type="textarea"
              placeholder="请输入权限描述"
              size="mini"
              maxlength="120"
              show-word-limit
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
import { deleteItem } from "@/utils/public";
import { Message } from "@/utils/importFile";
import {
  getMenuList,
  deleteMenuItem,
  getMenuInfo,
  addMenuInfo,
  editMenuInfo,
} from "@/api/api";
export default {
  data() {
    return {
      pages: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      creatOrEditId: 0,
      creatOrEdit: [
        {
          title: "创建权限",
          btn: "立即创建",
        },
        {
          title: "修改权限信息",
          btn: "立即修改",
        },
      ],
      tableData: [],
      //   弹框
      dialogFormVisible: false,
      form: {
        menuName: "",
        menuDesc: "",
      },
      rules: {
        menuName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取权限列表
    async getList() {
      try {
        const { pageNum, pageSize } = this.pages;
        const res = await getMenuList({ pageSize, pageNum });
        if (res.code !== 200) return Message.error(res.msg);
        this.tableData = res.rows;
        this.pages.total = res.total;
      } catch (error) {
        console.log(error);
      }
    },
    // 删除权限
    async deleteMenu(id) {
      try {
        const res = await deleteMenuItem(id);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("删除成功");
        // Math.ceil(--this.pages.total / this.pages.pageSize)
        this.pages.pageNum = 1;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 获取权限信息
    async getMenuInfo(id) {
      try {
        const res = await getMenuInfo(id);
        if (res.code !== 200) Message.error(res.msg);
        this.form = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    createAuth() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
    },
    // 添加  /  修改用户
    async addMenu(form) {
      try {
        // creatOrEditId :  0 创建 1 修改
        const res = this.creatOrEditId
          ? await editMenuInfo(form)
          : await addMenuInfo(form);
        if (res.code !== 200) return Message.error(res.msg);
        let message = this.creatOrEditId ? "修改成功" : "添加成功";
        Message.success(message);
        this.dialogFormVisible = false;
        this.getList();
      } catch (error) {
        console.log(error);
      }
    },
    // 创建权限
    createRole() {
      this.dialogFormVisible = true;
      this.creatOrEditId = 0;
    },
    // 编辑
    handleEdit(row) {
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      this.getMenuInfo(row.menuId);
    },
    // 删除
    handleDelete(row) {
      deleteItem(() => {
        // console.log(row.menuId);
        this.deleteMenu(row.menuId);
      });
    },
    // 提交
    submitForm(formName) {
      this.creatOrEditId=1
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMenu(this.form);
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
        menuName: "",
        menuDesc: "",
      };
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
.authorityManage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .mainContainer {
    flex: 1;
    border-radius: 6px;
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
    padding-bottom: 0;
    text-align: right;
  }
  .diaContainer {
    text-align: left;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
    padding: 15px;
    min-height: 475px;
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
.authorityManage {
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