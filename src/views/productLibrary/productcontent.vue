<template>
  <div class="robot">
    <div>
      <div class="addcreatebox">
        <div class="create return" @click="returns">返回</div>
        <div class="create" @click="addrobot">添加产品内容</div>
      </div>
      <el-dialog
        width="80%"
        :visible.sync="dialogFormVisible"
        @close="resetForm('ruleForm')"
      >
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
              <el-form-item label="产品库内容名称：" prop="productContentName">
                <el-input
                  v-model="ruleForm.productContentName"
                  placeholder="请输入产品库类型"
                  maxlength="10"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="产品库内容说明：">
                <el-input
                  v-model="ruleForm.productContentDesc"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入产品库说明"
                  maxlength="120"
                  show-word-limit
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="类型：" prop="productContentImportType">
                <el-radio-group
                  v-model="ruleForm.productContentImportType"
                  @change="changeradio"
                >
                  <el-radio v-model="radio" label="0">自动导入</el-radio>
                  <el-radio v-model="radio" label="1">手动导入</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="定时任务："
                prop="productContentDateNum"
                v-show="radiotype == 0"
              >
                <el-input-number
                  v-model="ruleForm.productContentDateNum"
                  controls-position="right"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                ></el-input-number
                >&ensp;&ensp;周
              </el-form-item>
              <el-form-item
                label="导入文件："
                prop="import"
                v-show="radiotype == 1"
              >
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-change="handleChange"
                  :http-request="uploadSectionFile"
                  :file-list="fileList"
                  :limit="1"
                  accept=".xls,.xlsx"
                >
                  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                  <div class="upload">点击上传</div>
                  <div slot="tip" class="el-upload__tip">
                    只能上传xlsx文件，且不超过500kb
                  </div>
                </el-upload>
                <div class="upload-box">
                  <!-- <a
                    href="http://192.168.2.180:8089/content/export/1"
                    class="up"
                    @click="download"
                  >
                    下载模版
                    <img
                      class="download"
                      src="@/assets/images/download.png"
                      alt=".."
                    />
                  </a> -->
                  <div class="up" @click="download">
                    下载模版
                    <img
                      class="download"
                      src="@/assets/images/download.png"
                      alt=".."
                    />
                  </div>
                </div>
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
          <el-table-column prop="productContentName" label="产品内容名称">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="id" :formatter="statusFormat" label="导入类型">
          </el-table-column>
          <el-table-column prop="createBy" label="操作人"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template slot-scope="scope">
              <el-button
                @click="handleEnable(scope.row)"
                type="text"
                class="release"
                >{{
                  scope.row.releaseStatus == "0" ? "未发布" : "已发布"
                }}</el-button
              >
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                class="edit"
                >编辑</el-button
              >

              <el-button
                type="text"
                @click="deleteClick(scope.row)"
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
  getdictionary,
  getproductlists,
  addproductcontent,
  editproductList,
  deletecontentList,
  release,
  getexport,
  upload
} from "@/api/productLibrary";
import { Message, MessageBox } from "@/utils/importFile";
export default {
  data() {
    return {
      currentPage1: 1,
      dialogFormVisible: false,
      robotname: null,
      filenamestL: "",
      radio: 1,
      radiotype: "",
      total: 1,
      dictionary: "",
      ruleForm: {
        productContentName: "",
        productContentDesc: "",
        productContentImportType: "0",
        productLibraryId: "",
        productContentDateNum: "",
        id: "",
        productContentFileUrl: ""
      },
      rules: {
        productContentName: [
          { required: true, message: "请输入产品库类型", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      formLabelWidth: "120px",
      fileList: [],
      tableData: []
    };
  },
  mounted() {
    this.ruleForm.productLibraryId = localStorage.getItem("productId");
    this.getdictionary();
  },
  methods: {
    // 查询字典库
    async getdictionary() {
      try {
        const res = await getdictionary("import_type");
        if (res.code == 200) {
          this.dictionary = res.data;
          this.getlists(1, 10);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取产品库列表
    async getlists(pageNum, pageSize) {
      try {
        const res = await getproductlists({
          pageSize: pageSize,
          pageNum: pageNum,
          id: this.ruleForm.productLibraryId
        });
        if (res.code == 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 岗位状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(
        this.dictionary,
        row.productContentImportType
      );
    },
    // 类型
    changeradio(value) {
      this.radiotype = value;
    },
    // 创建产品库内容
    addrobot() {
      this.ruleForm = {
        productContentName: "",
        productContentDesc: "",
        productContentImportType: "0",
        productLibraryId: "",
        productContentDateNum: "",
        id: "",
        productContentFileUrl: ""
      };
      this.radiotype = "0";
      this.fileList = [];
      this.ruleForm.productLibraryId = localStorage.getItem("productId");
      this.dialogFormVisible = true;
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    // 删除
    deleteClick(row) {
      deletecontentList(row.id).then(response => {
        if (response.code === 200) {
          Message.success("删除成功");
          this.getlists(1, 10);
          // this.getList();
        }
      });
    },
    // 发布
    handleEnable(row) {
      MessageBox.confirm("此操作将修改发布状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let status = row.releaseStatus == "0" ? "1" : "0";
          this.release(row.id, status);
        })
        .catch(() => {
          Message.info("已取消修改");
        });
    },
    // 修改发布状态
    async release(id, status) {
      try {
        const res = await release(id, status);
        if (res.code !== 200) return Message.error(res.msg);
        Message.success("修改成功");
        this.getlists();
      } catch (error) {
        console.log(error);
      }
    },
    handleClick(row) {
      console.log(row);
      this.fileList = [];
      this.dialogFormVisible = true;
      this.ruleForm.productContentName = row.productContentName;
      this.ruleForm.productContentDesc = row.productContentDesc;
      this.ruleForm.productContentDateNum = row.productContentDateNum;
      this.ruleForm.productContentImportType = row.productContentImportType.toString();
      this.radiotype = row.productContentImportType;
      this.fileList.push({
        name: row.createBy + ".xlsx",
        url: this.ruleForm.productContentFileUrl
      });
      // this.ruleForm.productContentImportType = row.productContentImportType;
      this.ruleForm.id = row.id;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getlists(val, 10);
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
    // 文件上传
    async uploadSectionFile(param) {
      var fileObj = param.file;
      var form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      try {
        const res = await upload(form);
        if (res.code == 200) {
          this.ruleForm.productContentFileUrl = res.data[0].url;
          this.filenamestL = res.data[0].name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.id == "") {
            addproductcontent(this.ruleForm).then(response => {
              if (response.code === 200) {
                Message.success("新增成功");
                this.dialogFormVisible = false;
                this.getlists(1, 10);
              }
            });
          } else {
            editproductList(this.ruleForm).then(response => {
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
    download() {
      getexport(1).then(response => {
        // let disposition = decodeURI(res.headers["Content-disposition"]);
        // let fileName = disposition.substring(
        //   disposition.indexOf("fileName=") + 9,
        //   disposition.length
        // );
        let data = response; // 这里后端对文件流做了一层封装，将data指向res.data即可
        if (!data) {
          return;
        }
        let url = window.URL.createObjectURL(new Blob([data]));
        let a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.setAttribute("download", "模板.xlsx");
        document.body.appendChild(a);
        a.click(); //执行下载
        window.URL.revokeObjectURL(a.href); //释放url
        document.body.removeChild(a); //释放标签

        // const content = response; //返回的内容
        // const fileName = "文件.xlsx"; //下载文件名
        // // // this.downFile(content, "总案件详情.xlsx");
        // // this.download(content, fileName);
        // if (response.code === 200) {
        //   Message.success("下载成功");
        // }
      });
    },
    // download(content, fileName) {
    //   // const blob = new Blob([content]); //创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
    //   const url = window.URL.createObjectURL(content); //URL.createObjectURL(object)表示生成一个File对象或Blob对象
    //   let dom = document.createElement("a"); //设置一个隐藏的a标签，href为输出流，设置download
    //   dom.style.display = "none";
    //   dom.href = url;
    //   dom.setAttribute("download", fileName); //指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
    //   document.body.appendChild(dom);
    //   dom.click();
    // },
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
  height: 710px;
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
.upload-box {
  display: flex;
  .up {
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 220px;
  }
  .download {
    width: 16px;
  }
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
