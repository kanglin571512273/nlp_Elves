<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt />
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          text-color="#fff"
          background-color="#2d3291"
          active-text-color="#fff"
          router
        >
          <el-menu-item route="/robot" index="1">机器人中心</el-menu-item>
          <el-menu-item route="/product" index="2">产品库</el-menu-item>
          <el-menu-item route="/knowledge" index="3">知识库</el-menu-item>
        </el-menu>.
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Container, Header, Main, Menu, MenuItem } from "element-ui";
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
export default {
  name: "home",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.home,
.el-container {
  height: 100%;
}
.el-container {
  .el-header {
    background: #2d3291;
    box-sizing: border-box;
    display: flex;
    .logo {
      img {
        width: 60px;
        margin: 0 10px;
      }
    }
    .el-menu {
      flex: 1;
      .is-active {
        &::after {
          content: "";
          width: 50px;
          height: 2px;
          background-color: #fff;
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0px;
}
.el-menu.el-menu--horizontal {
  border-bottom: 0px;
}
</style>