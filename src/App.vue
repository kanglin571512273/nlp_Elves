<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "element-ui";
Vue.use(Button);
export default {
  name: "App"
};
</script>

<style lang="less"></style>
