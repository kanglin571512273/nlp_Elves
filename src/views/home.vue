<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="@/assets/images/logo.png" alt />
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
        </el-menu>
        <div class="personInfo">
          <div class="headerImg">
            <img src="@/assets/images/avtor.png" alt />
          </div>
          <div class="changeSys">
            <img src="@/assets/images/manage.png" alt />
            <span>系统管理</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Button,
  Container,
  Header,
  Main,
  Menu,
  MenuItem,
} from "element-ui";
// Vue.use(Inport);
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
    box-shadow: 0px 2px 7px 0px rgba(45, 50, 145, 0.5);
    display: flex;
    .logo {
      width: 200px;
      padding-right: 80px;
      img {
        width: 100%;
        margin-top: 19px;
      }
    }
    .el-menu {
      flex: 1;
      .el-menu-item {
        font-size: 18px;
        padding: 0 30px;
      }
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
    .personInfo {
      width: 150px;
      display: flex;
      align-items: center;
      .headerImg {
        position: relative;
        img {
          width: 40px;
          border-radius: 50%;
        }
        &::after {
          content: "";
          width: 2px;
          height: 29px;
          background-color: #fff;
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .changeSys {
        color: #fff;
        padding-left: 20px;
        text-align: center;
        img {
          width: 12px;
        }
        span {
          font-size: 18px;
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
