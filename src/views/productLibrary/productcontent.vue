<template>
  <div class="robot">
    <div>
      <div class="addcreatebox">
        <div class="create return" @click="returns">返回</div>
        <div class="create" @click="dialogFormVisible = true">添加产品内容</div>
      </div>
      <el-dialog width="80%" :visible.sync="dialogFormVisible">
        <el-card>
          <div class="input-fix">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
              label-position="right"
            >
              <el-form-item label="产品库内容名称：" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入产品库类型"
                  maxlength="10"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="产品库内容说明：">
                <el-input
                  v-model="ruleForm.description"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入产品库说明"
                  maxlength="120"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="类型：" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio v-model="radio" label="1">自动导入</el-radio>
                  <el-radio v-model="radio" label="2">手动导入</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="定时任务：" prop="week">
                <el-input-number
                  v-model="week"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                ></el-input-number
                >&ensp;&ensp;周
              </el-form-item>
              <el-form-item label="导入文件：" prop="import">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange"
                  :file-list="fileList"
                >
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div class="upload">点击上传</div>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
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
          <el-table-column prop="serial" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="产品内容名称"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="id" label="导入类型"> </el-table-column>
          <el-table-column prop="address" label="操作人"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="text" class="release">发布</el-button>
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                class="edit"
                >编辑</el-button
              >

              <el-button type="text" class="delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage1: 5,
      dialogFormVisible: false,
      robotname: null,
      radio: 1,
      week: "",
      ruleForm: {
        name: "",
        description: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入产品库类型", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
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
      tableData: [
        {
          serial: 1,
          date: "2016-05-02",
          name: "王小虎",
          id: 67907790,
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          serial: 2,
          date: "2016-05-04",
          id: 67907790,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          serial: 3,
          date: "2016-05-01",
          id: 67907790,
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
          id: 67907790,
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    returns() {
      this.$router.push(`/product`);
    },
    handleChange(value) {
      console.log(value);
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
  margin-right: 30px;
  text-align: center;
}
.upload {
  width: 102px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background: #2d3291;
  color: #fff;
}
.return {
  border: 1px solid #2d3291;
  background: #fff;
  color: #2d3291;
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
.release {
  color: #00a195;
  font-weight: 400;
}
.box-card {
  height: 530px;
  position: relative;
}
.pagination {
  width: 500px;
  float: right;
  margin: 20px 0;
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
.addcreatebox {
  display: flex;
}
</style>

<style lang="less">
.input-fix {
  .el-form-item__label {
    width: 150px !important;
  }
  .el-form-item__content {
    margin-left: 155px !important;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #2d3291;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #2d3291;
    background: #2d3291;
  }
  .el-form-item__content {
    text-align: left;
  }
}
</style>
