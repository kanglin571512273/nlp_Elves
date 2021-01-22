<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from "@/views/home.vue";
import "@/assets/css/zxfStyle.css";

export default {
  name: "App",
  components: {
  },
};
</script>

<style lang="less">

#app,
.el-container {
  height: 100%;
}
</style>
