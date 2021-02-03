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
        <el-input
          size="mini"
          placeholder="请输入内容..."
          v-model="keyword"
          @change="search"
          class="input-with-select"
        >
          <img class="search" src="@/assets/images/search.png" alt slot="suffix" @click="search" />
          <el-select size="mini" v-model="select" slot="prepend" placeholder="请选择内容">
            <el-option label="知识库名称" value="1"></el-option>
            <el-option label="发布状态" value="2"></el-option>
            <el-option label="使用状态" value="3"></el-option>
          </el-select>
        </el-input>
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
      select: "1",
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
      const { activeId, select, keyword } = this;
      let searchName =
        +select === 1 ? "domain" : +select === 2 ? "releaseStatus" : "isUsed";
      let data = {
        [searchName]: keyword.trim(),
      };
      this.$refs.child.getList(data);
      this.keyword = "";
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
      .search {
        width: 13px;
        margin: 7px;
      }
    }
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
  width: 110px;
}
.knowledge .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
// }
</style>