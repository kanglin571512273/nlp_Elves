
<template>
  <div class="systemManage">
    <div class="toptNav">
      <div :class="{btnItem:true,active:activeId == 1}" @click="goOther(1)">用户管理</div>
      <div :class="{btnItem:true,active:activeId == 2}" @click="goOther(2)">角色管理</div>
      <div :class="{btnItem:true,active:activeId == 3}" @click="goOther(3)">权限管理</div>
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
  methods: {
    goOther(index) {
      let arr = ["userManage", "joleManage", "authorityManage"];
      if (this.$route.name == arr[index - 1]) return false;
      this.activeId = index;
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