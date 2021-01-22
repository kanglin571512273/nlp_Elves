<template>
  <div class="knowledge">
    <!--  导航区 -->
    <div class="aboveNav">
      <div class="leftNav">
        <div :class="{btnItem:true,active:activeId == 1}" @click="goOther(1)">我的知识库</div>
        <div :class="{btnItem:true,active:activeId == 2}" @click="goOther(2)">官方知识库</div>
        <div :class="{btnItem:true,active:activeId == 3}" @click="goOther(3)">第三方知识库</div>
      </div>
      <div class="rightSearch">
        <el-input size="mini" placeholder="请输入内容..." v-model="keyword" class="input-with-select">
          <el-select size="mini" v-model="select" slot="prepend" placeholder="请选择内容">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </el-input>
      </div>
    </div>
    <!-- 展示区 -->
    <div class="belowMain">
      <div class="btn">
        <div class="myBtn myBtn_blue myBtn_middle" @click="$router.push('/addKnowledge')">创建知识库</div>
      </div>
      <div class="cartContain">
        <CartItem v-for="item in 4" :key="item"></CartItem>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/zxfStyle.css";
import Vue from "vue";
import { Input, Select, Option } from "element-ui";
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
import CartItem from "./components/CartItem";

export default {
  components: { CartItem },
  data() {
    return {
      keyword: "",
      select: "",
      activeId: 1,
    };
  },
  methods: {
    goOther(index) {
      this.activeId = index;
    },
  },
};
</script>

<style lang="less" scoped >
.knowledge {
  height: 100%;
  display: flex;
  flex-direction: column;
  // 导航区
  .aboveNav {
    display: flex;
    justify-content: space-between;
    .leftNav {
      display: flex;
      .btnItem {
        height: 28px;
        border: 2px solid #f0f2f5;
        padding: 3px 30px;
        box-sizing: border-box;
        background: #f0f2f5;
        color: #666;
        border-radius: 2px;
        &.active {
          background-color: #fff;
          color: #2d3291;
        }
      }
    }
  }
  // 展示区
  .belowMain {
    border: 1px solid #f0f2f5;
    flex: 1;
    border-radius: 2px;
    padding: 15px;
    text-align: left;
    display: flex;
    flex-direction: column;
    // 卡片容器
    .cartContain {
      margin-top: 10px;
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
<style lang="less">
// 修改element样式
.el-select .el-input {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>