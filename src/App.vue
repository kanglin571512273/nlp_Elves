<template>
  <div id="app">
    <!-- <Home></Home> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/views/home.vue";
import "@/assets/css/zxfStyle.css";
import "@/utils/importFile";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style lang="less">
#app,
.el-container {
  height: 100%;
}
.el-tooltip__popper {
  max-width: 300px;
  line-height: 20px;
  text-indent: 2em;
  text-align: left;
}
</style>
