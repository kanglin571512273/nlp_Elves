<template>
  <div class="robot">
    <div>
      <div class="create" @click="addrobot">创建产品库</div>
      <el-dialog
        width="80%"
        :visible.sync="dialogFormVisible"
        @close="resetForm('ruleForm')"
      >
        <el-card class="productfix">
          <div class="input-fix">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-form-item label="产品库类型：" prop="productLibraryType">
                <el-input
                  v-model="ruleForm.productLibraryType"
                  placeholder="请输入产品库类型"
                  maxlength="10"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="产品库说明：">
                <el-input
                  v-model="ruleForm.productLibraryDesc"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入产品库说明"
                  maxlength="120"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="submit-box">
            <div class="create cancel" @click="dialogFormVisible = false">
              取 消
            </div>
            <div class="create " @click="submitForm('ruleForm')">
              确 定
            </div>
          </div>
        </el-card>
      </el-dialog>

      <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="serial" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="productLibraryType" label="产品库类型">
          </el-table-column>
          <el-table-column prop="productContentNum" label="内容数量">
            <template slot-scope="scope">
              <el-button type="text" @click="contentClick(scope.row)">{{
                scope.row.productContentNum
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productLibraryDesc" label="产品库说明">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="edit"
                >编辑</el-button
              >
              <el-button
                @click="deleteClick(scope.row)"
                type="text"
                size="small"
                class="delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getList,
  getdictionary,
  addproduct,
  editList,
  deleteList
} from "@/api/productLibrary";
import { Message } from "@/utils/importFile";
export default {
  data() {
    return {
      currentPage1: 1,
      dialogFormVisible: false,
      robotname: null,
      radio: "1",
      total: 1,
      dictionary: [],
      ruleForm: {
        productLibraryType: "",
        productLibraryDesc: "",
        id: ""
      },
      rules: {
        productLibraryType: [
          { required: true, message: "请输入产品库类型", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        productLibraryDesc: [
          { required: true, message: "请输入产品库说明", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.getdictionary();
  },
  methods: {
    // 查询字典库
    async getdictionary() {
      try {
        const res = await getdictionary("product_type");
        if (res.code == 200) {
          this.dictionary = res.data;
          this.getlists(1, 10);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 创建产品库
    addrobot() {
      this.ruleForm = {
        productLibraryType: "",
        productLibraryDesc: "",
        id: ""
      };
      this.dialogFormVisible = true;
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.dictionary, row.productLibraryType);
    },
    // 获取产品库列表
    async getlists(pageNum, pageSize) {
      try {
        const res = await getList({ pageSize: pageSize, pageNum: pageNum });
        if (res.code == 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.ruleForm.id = row.id;
      this.ruleForm.productLibraryType = row.productLibraryType;
      this.ruleForm.productLibraryDesc = row.productLibraryDesc;
    },
    // 删除
    deleteClick(row) {
      deleteList(row.id).then(response => {
        if (response.code === 200) {
          Message.success("删除成功");
          this.getlists(1, 10);
          // this.getList();
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getlists(val, 10);
      this.currentPage1 = val;
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id == "") {
            addproduct(this.ruleForm).then(response => {
              if (response.code === 200) {
                Message.success("新增成功");
                this.dialogFormVisible = false;
                this.getlists(1, 10);
                // this.getList();
              }
            });
          } else {
            editList(this.ruleForm).then(response => {
              if (response.code === 200) {
                Message.success("编辑成功");
                this.dialogFormVisible = false;
                this.getlists(1, 10);
                // this.getList();
              }
            });
          }
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    contentClick(row) {
      this.$router.push({
        name: "productcontent"
      });
      localStorage.setItem("productId", row.id);
    }
  }
};
</script>

<style lang="less" scoped>
.create {
  width: 105px;
  height: 32px;
  line-height: 32px;
  background: #2d3291;
  color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.edit {
  color: #2d3291;
  margin: 0 25px;
  font-weight: 400;
  font-size: 14px;
}
.delete {
  color: #ff4a00;
  font-weight: 400;
  margin: 0;
  font-size: 14px;
}
.box-card {
  height: 710px;
  position: relative;
}
.pagination {
  width: 500px;
  float: right;
  margin: 20px 0;
}
.productfix {
  height: 475px;
}
.input-fix {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  form {
    width: 100%;
  }
  .red {
    color: red;
  }
  .robotname {
    width: 150px;
    margin-right: 50px;
    text-align: left;
  }
}
.submit-box {
  margin-top: 270px;
  display: flex;
  justify-content: flex-end;
  .cancel {
    background-color: #818181;
    margin-right: 20px;
  }
  .create {
    margin-bottom: 0;
  }
}
.radio-box {
  width: 606px;
}
.el-dialog__body {
  padding: 10px 20px;
}
.el-dialog__header {
  text-align: left !important;
}
</style>
