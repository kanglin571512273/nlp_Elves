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
          <el-menu-item
            v-for="item in nav"
            :key="item.path"
            :route="'/' + item.path"
            :index="item.path"
          >{{item.menuName}}</el-menu-item>
        </el-menu>
        <div class="personInfo">
          <div class="headerImg">
            <img src="@/assets/images/avtor.png" alt />
          </div>
          <div class="changeSys">
            <img src="@/assets/images/manage.png" alt />
            <span @click="logout">退出</span>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getRouteMenu } from "@/api/api";
import { Message, MessageBox } from "element-ui";
export default {
  name: "home",
  data() {
    return {
      activeIndex: "",
      nav: [],
    };
  },
  created() {
    this.getRouteMenu();
  },
  methods: {
    // 路由
    async getRouteMenu() {
      try {
        const res = await getRouteMenu();
        if (res.code !== 200) Message.error(res.msg);
        this.nav = res.userMenus;
        // 刷新时，当前路由还是高亮
        this.activeIndex = this.$route.meta.parent;
      } catch (error) {
        console.log(error);
      }
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    logout() {
      MessageBox.confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("effectToken");
          this.$router.push("/login");
          Message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消退出",
          });
        });
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
      cursor: pointer;
      .headerImg {
        cursor: default;
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
