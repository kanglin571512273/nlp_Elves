<template>
  <div class="knowledge">
    <!--  导航区 -->
    <div class="aboveNav">
      <div class="leftNav">
        <div
          class="default"
          :class="{ btnItem: true, active: activeId == 1 }"
          @click="goOther(1)"
        >
          机器人概览
        </div>
        <div
          class="default"
          :class="{ btnItem: true, active: activeId == 2 }"
          @click="goOther(2)"
        >
          机器人定制
        </div>
      </div>
    </div>
    <!-- 展示区 -->
    <div class="belowMain">
      <router-view />
     
      <!-- <div class="btn">
        <div class="myBtn myBtn_blue myBtn_middle" @click="$router.push('addKnowledge')">创建知识库</div>
      </div>
      <div class="cartContain">
        <CartItem v-for="item in 4" :key="item"></CartItem>
      </div>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Input, Select } from "element-ui";
Vue.use(Input);
Vue.use(Select);

export default {
  data() {
    return {
      keyword: "",
      select: "",
      activeId: 1
    };
  },
  methods: {
    goOther(index) {
      this.activeId = index;
      let arr = ["", "custom"];
      // console.log();
      this.$router.push(`/information/${arr[index - 1]}`);
    }
  }
};
</script>

<style lang="less" scoped>
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
.default {
  cursor: pointer;
}

</style>
