<template>
  <div class="cartItem">
    <div class="infoContain">
      <div class="leftImg">
        <img src="@/assets/images/1.png" alt />
      </div>
      <div class="rightInfo">
        <div class="title">
          <span>农行知识库</span>
          <div class="myBtn myBtn_success myBtn_plain">已使用</div>
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
      <div class="btnContain">
        <div class="littleBtn myBtn_primary">创建内容</div>
        <div class="littleBtn myBtn_waring">发布</div>
        <div class="littleBtn myBtn_info">取消发布</div>
      </div>
      <div class="rightIcon">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-menu"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">体验</el-dropdown-item>
            <el-dropdown-item command="2">编辑</el-dropdown-item>
            <el-dropdown-item command="3">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/zxfStyle.css";
import Vue from "vue";
import { Dropdown, DropdownItem, DropdownMenu } from "element-ui";
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  methods: {
    // 右下角的体验  删除  编辑
    handleCommand(index) {
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
// 卡片
.cartItem {
  width: 32%;
  height: 162px;
  border: 1px dotted #979797;
  border-radius: 2px;
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
        width: 108px;
        height: 80px;
      }
    }
    .rightInfo {
      margin-left: 15px;
      flex: 1;
      .title {
        display: flex;
        justify-content: space-between;
      }
      .info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 30px;
      }
    }
  }
  .belowBtn {
    box-shadow: 0px -2px 6px 0px rgba(45, 50, 145, 0.05);
    height: 42px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btnContain {
    }
  }
}
</style>