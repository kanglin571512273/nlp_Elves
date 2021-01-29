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
          >{{item.name}}</el-menu-item>
        </el-menu>
        <div class="personInfo">
          <div class="headerImg">
            <img src="@/assets/images/avtor.png" alt />
          </div>
          <div class="changeSys">
            <img :src="imgUrl[systemId]" alt />
            <span @click="goOther">{{systemName[systemId]}}</span>
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
export default {
  name: "home",
  data() {
    return {
      activeIndex: "robot",
      systemId: 0,
      imgUrl: [
        require("@/assets/images/manage.png"),
        require("@/assets/images/home.png"),
      ],
      systemName: ["系统管理", "返回首页"],
      nav: [
        { name: "机器人中心", path: "robot" },
        { name: "产品库", path: "product" },
        { name: "知识库", path: "knowledge" },
      ],
      tempnav: [
        { name: "机器人中心", path: "robot" },
        { name: "产品库", path: "product" },
        { name: "知识库", path: "knowledge" },
      ],
      system: [{ name: "系统管理", path: "systemManage" }],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    goOther() {
      this.systemId = ++this.systemId % 2;
      this.nav = this.systemId ? this.system : this.tempnav;
      this.systemId
        ? this.$router.push("/systemManage")
        : this.$router.push("/");
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
