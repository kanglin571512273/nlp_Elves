<template>
  <div class="robot">
    <div>
      <div class="create" @click="dialogFormVisible = true">创建机器人</div>
      <el-dialog
        width="80%"
        :visible.sync="dialogFormVisible"
      >
        <el-card class="suffix">
          <div class="input-suffix">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-form-item label="机器人名称：" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入机器人名称"
                  maxlength="20"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="机器人名称：" prop="name">
              <el-input clearable v-model="ruleForm.name"></el-input>
            </el-form-item> -->
              <el-form-item label="类型：" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio v-model="radio" label="1">API接入</el-radio>
                  <el-radio v-model="radio" label="2">通用模式</el-radio>
                </el-radio-group>
              </el-form-item>

              <div class="input-suffix">
                <div class="robotname">上传图片：</div>
                <div class="radio-box">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </div>
            </el-form>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <div class="submit-box">
            <div class="create cancel" @click="dialogFormVisible = false">
              取 消
            </div>
            <div class="create " @click="submitForm('ruleForm')">
              确 定
            </div>
          </div>
        </div>
      </el-dialog>

      <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="serial" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="类型">
            <template slot-scope="scope">
              <el-button type="text" @click="informationClick">{{
                scope.row.name
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                class="edit"
                >编辑</el-button
              >
              <el-button type="text" size="small" class="delete"
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
      radio: "1",
      ruleForm: {
        name: "",
        resource: "1"
      },
      rules: {
        name: [
          { required: true, message: "请输入机器人名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      fileList: [
       
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
    informationClick() {
      this.$router.push(`/information`);
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
.suffix{
  height:400px
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

.input-suffix {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  .red {
    color: red;
  }
  .robotname {
    width: 150px;
    line-height: 20px;
    text-align: left;
    margin-left: 8px;
    font-size: 14px;
    color: #606266;
  }
  .upload-demo{
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
