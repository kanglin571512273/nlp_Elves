<template>
  <div class="robot">
    <div>
      <div class="create" @click="addrobot">创建机器人</div>
      <el-dialog width="80%" :visible.sync="dialogFormVisible">
        <el-card class="suffix">
          <div class="input-suffix">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="110px"
              class="demo-ruleForm"
              label-position="right"
            >
              <el-form-item label="机器人名称：" prop="robotName">
                <el-input
                  v-model="ruleForm.robotName"
                  placeholder="请输入机器人名称"
                  maxlength="20"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="机器人名称：" prop="name">
              <el-input clearable v-model="ruleForm.name"></el-input>
            </el-form-item> -->
              <el-form-item label="类型：" prop="type">
                <el-radio-group v-model="ruleForm.type">
                  <el-radio
                    :label="item.value"
                    v-for="item in dictionary"
                    :key="item.id"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上传图片：" prop="import">
                <!-- :on-success="handleAvatarSuccess" -->
                <el-upload
                  class="upload-demo"
                  action="http://192.168.0.195:8089/img/upload"
                  :http-request="uploadSectionFile"
                  :on-change="handleChange"
                  :before-remove="beforeRemove"
                  :file-list="fileList"
                  list-type="picture"
                  :limit="1"
                >
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div class="upload">点击上传</div>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
              <!-- <div class="input-suffix">
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
              </div> -->
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
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="robotName" label="名称">
            <template slot-scope="scope">
              <el-button type="text" @click="informationClick(scope.row)">{{
                scope.row.robotName
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="seriesId" label="ID"> </el-table-column>
          <el-table-column prop="type" :formatter="statusFormat" label="类型">
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
                type="text"
                size="small"
                class="delete"
                @click="deleteClick(scope.row)"
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
  upload,
  addrobotts,
  deleteList,
  editList
} from "@/api/robotCenter";
import { Message, MessageBox } from "@/utils/importFile";
export default {
  data() {
    return {
      currentPage1: 1,
      dialogFormVisible: false,
      robotname: null,
      dictionary: [],
      total: 1,
      ruleForm: {
        robotName: "",
        type: "",
        pictureUrl: "",
        id: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入机器人名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择活动资源", trigger: "change" }]
      },
      formLabelWidth: "120px",
      fileList: [],
      tableData: []
    };
  },
  mounted() {
    this.getdictionary();
  },
  methods: {
    // 获取列表
    async getList(pageNum, pageSize) {
      try {
        const res = await getList({
          pageSize: pageSize,
          pageNum: pageNum
        });
        if (res.code == 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询字典库
    async getdictionary() {
      try {
        const res = await getdictionary({});
        if (res.code == 200) {
          this.dictionary = res.data;
          this.getList(1, 10);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.dictionary, row.type);
    },
    // 创建机器人
    addrobot() {
      this.dialogFormVisible = true;
      this.ruleForm = {
        robotName: "",
        type: "api",
        pictureUrl: " ",
        id: ""
      };
      this.fileList = [];
    },
    async uploadSectionFile(param) {
      var fileObj = param.file;
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      try {
        const res = await upload(form);
        if (res.code == 200) {
          this.ruleForm.pictureUrl = res.data[0].onlineUrl;
        }
      } catch (error) {
        console.log(error);
      }
    },

    handleClick(row) {
      this.fileList = [];
      this.dialogFormVisible = true;
      this.ruleForm.robotName = row.robotName;
      this.ruleForm.type = row.type;
      this.ruleForm.pictureUrl = row.pictureUrl;
      console.log(this.ruleForm.pictureUrl);
      this.fileList.push({ name: row.seriesId, url: this.ruleForm.pictureUrl });
      this.ruleForm.id = row.id;
    },
    // 删除
    deleteClick(row) {
      deleteList(row.id).then(response => {
        if (response.code === 200) {
          Message.success("删除成功");
          this.getList(1, 10);
          // this.getList();
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, 10);
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
      console.log(file, fileList);
      // return MessageBox.confirm(`确定移除 ${file.name}？`);
    },
    submitForm(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id == "") {
            addrobotts(this.ruleForm).then(response => {
              if (response.code === 200) {
                Message.success("新增成功");
                this.dialogFormVisible = false;
                this.getList(1, 10);
                // this.getList();
              }
            });
          } else {
            editList(this.ruleForm).then(response => {
              if (response.code === 200) {
                Message.success("编辑成功");
                this.dialogFormVisible = false;
                this.getList(1, 10);
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
    informationClick(row) {
      this.$router.push({
        name: "overview",
      });
      localStorage.setItem("seriesId",row.id) 
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
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
.suffix {
  height: 475px;
  position: relative;
  .submit-box {
    position: absolute;
    right: 20px;
    bottom: 20px;
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
}
.upload {
  width: 102px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  background: #2d3291;
  color: #fff;
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
  .upload-demo {
    text-align: left;
  }
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

<style lang="less">
.input-suffix {
  .el-form {
    width: 100%;
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
