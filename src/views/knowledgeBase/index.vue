<template>
  <div class="knowledge">
    <!--  导航区 -->
    <div class="aboveNav">
      <div class="leftNav">
        <div :class="{btnItem:true,active:activeId == 'myKnowledge'}" @click="goOther(1)">我的知识库</div>
        <div
          :class="{btnItem:true,active:activeId == 'officialKnowledge'}"
          @click="goOther(2)"
        >官方知识库</div>
        <div
          :class="{btnItem:true,active:activeId == 'thirdPartyKnowledge'}"
          @click="goOther(3)"
        >第三方知识库</div>
      </div>
      <div class="rightSearch">
        <el-select size="mini" v-model="releaseStatus" @change="search" placeholder="请选择发布状态">
          <el-option label="未发布" :value="0"></el-option>
          <el-option label="已发布" :value="1"></el-option>
        </el-select>
        <el-select size="mini" v-model="isUsed" @change="search" placeholder="请选择使用状态">
          <!--  -->
          <el-option label="未使用" :value="0"></el-option>
          <el-option label="已使用" :value="1"></el-option>
        </el-select>
        <el-input size="mini" placeholder="请输入知识库名称..." v-model="domain" @blur="search">
          <img class="search" src="@/assets/images/search.png" alt slot="suffix" @click="search" />
        </el-input>
        <div class="reset" @click="reset">重置</div>
      </div>
    </div>
    <!-- 展示区 -->
    <div class="belowMain">
      <router-view ref="child" />
    </div>
  </div>
</template>

<script>
// import "@/utils/importFile";
import CartItem from "./components/CartItem";

export default {
  components: { CartItem },
  data() {
    return {
      keyword: "",
      releaseStatus: null,
      isUsed: null,
      domain: null,
      activeId: "myKnowledge",
    };
  },
  mounted() {
    this.activeId = this.$route.name;
  },

  methods: {
    goOther(index) {
      let arr = ["myKnowledge", "officialKnowledge", "thirdPartyKnowledge"];
      if (this.$route.name == arr[index - 1]) return false;
      this.activeId = arr[index - 1];
      this.$router.push(`/${arr[index - 1]}`);
    },
    search() {
      let { releaseStatus, isUsed, domain } = this;
      let data = { releaseStatus, isUsed, domain };
      this.$refs.child.getList(data);
    },
    reset() {
      this.releaseStatus = null;
      this.isUsed = null;
      this.domain = null;
      this.search();
    },
  },
};
</script>

<style lang="less" scoped >
.knowledge {
  height: 100%;
  display: flex;
  flex-direction: column;
  // 导航区
  .aboveNav {
    display: flex;
    justify-content: space-between;
    .leftNav {
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
    .rightSearch {
      display: flex;
      .search {
        width: 13px;
        margin: 7px;
      }
    }
  }
  .reset {
    color: #fff;
    background-color: #2d3291;
    width: 85px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    border-radius: 4px;
    padding: 0 5px;
    margin: 0 4px;
    cursor: pointer;
  }
  // 展示区
  .belowMain {
    // border: 1px solid #f0f2f5;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    flex: 1;
    border-radius: 6px;
    padding: 15px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
}
</style>
<style lang="less">
// 修改element样式
// .knowledge {
.knowledge .el-select .el-input {
  width: 130px;
}
.knowledge .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
// }
</style>