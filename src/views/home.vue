<template>
  <div class="home">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Container, Header, Main } from "element-ui";
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
export default {
  name: "home",
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>