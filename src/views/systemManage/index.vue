
<template>
  <div class="systemManage">
    <div class="toptNav">
      <div :class="{btnItem:true,active:activeId == 'userManage'}" @click="goOther(1)">用户管理</div>
      <div :class="{btnItem:true,active:activeId == 'joleManage'}" @click="goOther(2)">角色管理</div>
      <div :class="{btnItem:true,active:activeId == 'authorityManage'}" @click="goOther(3)">权限管理</div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId: 1,
    };
  },
  mounted() {
    this.activeId = this.$route.name;
  },
  methods: {
    goOther(index) {
      let arr = ["userManage", "joleManage", "authorityManage"];
      if (this.$route.name == arr[index - 1]) return false;
      this.activeId = arr[index - 1];
      this.$router.push(`${arr[index - 1]}`);
    },
  },
};
</script>

<style lang="less" scoped >
.systemManage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .toptNav {
    display: flex;
    .btnItem {
      cursor: pointer;
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
  .container {
    flex: 1;
  }
}
</style>