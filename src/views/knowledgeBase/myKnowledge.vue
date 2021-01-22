<template>
  <div class="myKnowledge">
    <div class="btn">
      <div class="myBtn myBtn_blue myBtn_middle" @click="dialogFormVisible = true">创建知识库</div>
    </div>
    <div class="cartContain">
      <CartItem v-for="item in 4" :key="item"></CartItem>
    </div>

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
        <el-form-item label="知识库说明" prop="name">
          <el-input
            type="textarea"
            v-model="ruleForm.name"
            maxlength="120"
            show-word-limit
            placeholder="请输入知识库名称"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
import Vue from "vue";
import { Dialog, Form, FormItem, Button } from "element-ui";
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);

export default {
  components: { CartItem },

  data() {
    return {
      dialogFormVisible: false,
      ruleForm: {
        name: "",
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  }
}
</style>