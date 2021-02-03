<template>
  <div class="cartItem">
    <div class="infoContain">
      <div class="leftImg">
        <img :src="data.iconUrl" alt />
      </div>
      <div class="rightInfo">
        <div class="title">
          <span>{{data.name}}</span>
          <div
            v-show="$route.name == 'myKnowledge' && data.isUsed "
            class="myBtn myBtn_success myBtn_plain"
          >已使用</div>
        </div>
        <div class="info">
          <div class="infoItem ellipsis">
            <span>说明：</span>
            <span>{{data.remark}}</span>
          </div>
          <div class="infoItem ellipsis">
            <span>时间：</span>
            <span>{{data.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="belowBtn">
      <div class="btnContain" v-show="$route.name == 'myKnowledge'">
        <div class="littleBtn myBtn_primary" @click="createContent(data.id)">创建内容</div>
        <div
          v-show="!data.releaseStatus"
          class="littleBtn myBtn_waring"
          @click="editReleaseStatus(data.id,1)"
        >发布</div>
        <div
          v-show="data.releaseStatus"
          class="littleBtn myBtn_info"
          @click="editReleaseStatus(data.id,0)"
        >取消发布</div>
      </div>
      <div class="rightIcon">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- <i class="el-icon-menu"></i> -->
            <img class="more" src="@/assets/images/more.png" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'1-' + data.id">体验</el-dropdown-item>
            <el-dropdown-item :command="'2-' + data.id">编辑</el-dropdown-item>
            <el-dropdown-item :command="'3-' + data.id">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: { type: Object, default: () => {} } },
  mounted() {
    // console.log(this.data);
  },
  methods: {
    // 创建内容
    createContent(id) {
      this.$router.push({
        path: "/createContent",
        name: "createContent",
        params: {
          id,
        },
      });
    },
    // 修改发布状态
    editReleaseStatus(id, index) {
      this.$emit("editReleaseStatus", id, index);
    },
    // 右下角的体验  删除  编辑
    handleCommand(index) {
      let first = +index.split("-")[0];
      let id = index.split("-")[1];
      switch (first) {
        case 1:
          this.$router.push({
            path: "/chatRoom",
            name: "chatRoom",
            params: { id },
          });
          break;
        case 2:
          this.$emit("editItem", id);
          break;
        case 3:
          this.$emit("deleteItem", id);
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 卡片
.cartItem {
  width: 32%;
  height: 185px;
  border: 1px dotted #979797;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  float: left;
  margin: 5px;
  overflow: hidden;
  .infoContain {
    flex: 1;
    padding: 15px;
    display: flex;

    .leftImg {
      img {
        width: 142px;
        height: 108px;
      }
    }
    .rightInfo {
      margin-left: 15px;
      flex: 1;
      .title {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
      }
      .info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 44px;
      }
    }
  }
  .belowBtn {
    box-shadow: 0px -2px 6px 0px rgba(45, 50, 145, 0.05);
    height: 42px;
    padding: 0 15px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    .btnContain {
      margin-top: 11px;
      float: left;
      > div {
        margin-right: 8px;
      }
    }
    .rightIcon {
      margin-top: 11px;
      float: right;
      .more {
        width: 16px;
      }
    }
  }
}
</style>
<style lang="less">
.el-dropdown-menu {
  padding: 0;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #d8d8d8;
  color: #333333;
}
</style>