<template>
  <div class="cartItem">
    <div class="infoContain">
      <div class="leftImg">
        <img src="@/assets/images/1.png" alt />
      </div>
      <div class="rightInfo">
        <div class="title">
          <span>农行知识库</span>
          <div v-show="$route.name == 'myKnowledge'" class="myBtn myBtn_success myBtn_plain">已使用</div>
        </div>
        <div class="info">
          <div class="infoItem ellipsis">
            <span>说明：</span>
            <span>理财知识库</span>
          </div>
          <div class="infoItem ellipsis">
            <span>时间：</span>
            <span>2021-01-13 12:12:12</span>
          </div>
        </div>
      </div>
    </div>
    <div class="belowBtn">
      <div class="btnContain" v-show="$route.name == 'myKnowledge'">
        <div class="littleBtn myBtn_primary">创建内容</div>
        <div class="littleBtn myBtn_waring">发布</div>
        <div class="littleBtn myBtn_info">取消发布</div>
      </div>
      <div class="rightIcon">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- <i class="el-icon-menu"></i> -->
            <img class="more" src="@/assets/images/more.png" alt />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1-11">体验</el-dropdown-item>
            <el-dropdown-item command="2-11">编辑</el-dropdown-item>
            <el-dropdown-item command="3-11">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
// import "@/assets/css/zxfStyle.css";
// import "@/utils/importFile";

export default {
  methods: {
    // 右下角的体验  删除  编辑
    handleCommand(index) {
      console.log(index);
      let first = index.split("-")[0];
      switch (+first) {
        case 1:
          this.$router.push("/chartRoom");
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