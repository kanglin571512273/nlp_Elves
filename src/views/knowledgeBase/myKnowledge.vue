<template>
  <div class="myKnowledge">
    <div class="btn">
      <div class="createBtn" @click="dialogFormVisible = true">创建知识库</div>
    </div>
    <div class="cartContain scrollbar">
      <CartItem v-for="item in 2" :key="item"></CartItem>
    </div>
    <!-- 添加知识狂弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <div class="diaContainer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="right"
        >
          <span class="header">创建知识库</span>
          <el-form-item label="知识库名称:" prop="name">
            <el-input
              v-model="ruleForm.name"
              maxlength="20"
              size="mini"
              show-word-limit
              placeholder="请输入知识库名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="知识库说明:">
            <el-input
              type="textarea"
              size="mini"
              v-model="ruleForm.textarea"
              maxlength="120"
              show-word-limit
              placeholder="请输入知识库名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片:">
            <el-upload
              size="mini"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <div class="myBtn myBtn_blue" v-show="!fileList.length">上传图片</div>
            </el-upload>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <div class="myBtn_info diaBtn" @click="resetForm('ruleForm')">取 消</div>
          <div class="myBtn_blue diaBtn" @click="submitForm('ruleForm')">立即创建</div>
        </div>
      </div>
    </el-dialog>
    <!-- 聊天框弹框 -->
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
import { MessageBox } from "@/utils/importFile";
export default {
  components: { CartItem },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from);
  //   next();
  // },
  data() {
    return {
      fileList: [
        //
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        textarea: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      dialogFormVisible1: true,
    };
  },
  methods: {
    addKnowledge() {},
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = [];
      console.log(file, fileList);
    },
    // 预览图片
    handlePreview(file) {
      console.log(file);
    },
    // 超出文件时
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 删除之前
    beforeRemove(file, fileList) {
      return MessageBox.confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="less" scoped>
.myKnowledge {
  // 卡片容器
  .cartContain {
    margin-top: 10px;
    flex: 1;
    overflow: auto;
    height: 520px;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
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
  .myBtn {
    width: 80px;
    height: 31px;
    padding: 0;
    text-align: center;
    line-height: 31px;
  }
}
</style>
<style  lang="less" >
.myKnowledge {
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