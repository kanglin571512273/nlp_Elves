<template>
  <div class="myKnowledge">
    <div class="btn">
      <div class="myBtn myBtn_blue myBtn_middle" @click="dialogFormVisible = true">创建知识库</div>
    </div>
    <div class="cartContain">
      <CartItem v-for="item in 4" :key="item"></CartItem>
    </div>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
import Vue from "vue";
import { Dialog } from "element-ui";
Vue.use(Dialog);

export default {
  components: { CartItem },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    addKnowledge() {},
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