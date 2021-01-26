<template>
  <div class="myKnowledge">
    <div class="btn">
      <div class="myBtn myBtn_blue myBtn_middle" @click="dialogFormVisible = true">创建知识库</div>
    </div>
    <div class="cartContain scrollbar">
      <CartItem v-for="item in 19" :key="item"></CartItem>
    </div>
    <!-- 添加知识狂弹窗 -->
    <el-dialog title="创建知识库" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="知识库名称" prop="name">
          <el-input v-model="ruleForm.name" maxlength="20" show-word-limit placeholder="请输入知识库名称"></el-input>
        </el-form-item>
        <el-form-item label="知识库说明">
          <el-input
            type="textarea"
            v-model="ruleForm.textarea"
            maxlength="120"
            show-word-limit
            placeholder="请输入知识库名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
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
        <div class="myBtn littleBtn myBtn_info" @click="resetForm('ruleForm')">取 消</div>
        <div class="myBtn littleBtn myBtn_blue" @click="submitForm('ruleForm')">立即创建</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
import { MessageBox } from "@/utils/importFile";
export default {
  components: { CartItem },

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
  }
}
</style>
<style  lang="less" >
.myKnowledge {
  .el-input .el-input__count,
  .el-textarea .el-input__count {
    color: #ff4a00;
  }
}
</style>