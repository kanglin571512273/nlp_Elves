<template>
  <div class="chatRoom">
    <div class="btnContainer">
      <div class="myBtn myBtn_blue myBtn_plain myBtn_plain_blue">
        <img src="@/assets/images/arrow.png" alt />
        返回
      </div>
    </div>
    <div class="contentContainer">
      <!-- 知识库列表 -->
      <div class="libraryList">
        <div class="libraryItem active" v-for="item in 5" :key="item">
          <img src="@/assets/images/1.png" alt />
          <div class="info">
            <div class="title">中信知识库</div>
            <div class="explain">说明： 333333</div>
            <div class="time">时间：20-11-11 12:12:12</div>
          </div>
        </div>
      </div>
      <div class="chatRefion">
        <!-- 聊天展示区 -->
        <div ref="chatDisplay" class="chatDisplay">
          <span class="welcome">数字迎宾机器人，为您服务~</span>
          <div class="chatItemContainer" v-for="(item,index) in messageList" :key="index">
            <div
              :class="{chatItem:true, [item.type == 1 ? 'question' : 'answer']:true}"
            >{{item.message}}</div>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="chatInput">
          <!-- <input type="text" placeholder="请输入您的问题，按Enter键发送~" /> -->
          <textarea name id cols="30" rows="10" placeholder="请输入您的问题，按Enter键发送~" @keyup="send"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageList: [],
    };
  },
  methods: {
    send(e) {
      if (e.keyCode !== 13 || e.target.value.trim() == "") return false;
      //   if (e.target.value.trim() == "") return false;
      if (this.messageList.length > 2) {
        this.messageList.push({ message: e.target.value, type: 2 });
      } else {
        this.messageList.push({ message: e.target.value, type: 1 });
      }
      e.target.value = "";
      this.$refs.chatDisplay.scrollTop = this.$refs.chatDisplay.scrollHeight;
    },
  },
};
</script>
<style lang="less" scoped>
.chatRoom {
  text-align: left;
  height: 100%;
  .myBtn {
    color: rgba(45, 50, 145, 1);
    width: 83px;
    text-align: center;
    img {
      width: 14px;
      vertical-align: middle;
    }
  }
  .contentContainer {
    margin-top: 10px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
    display: flex;
    box-sizing: border-box;
    height: calc(100% - 38px);
    // 知识库列表
    .libraryList {
      //   width: 480px;
      background: rgba(216, 216, 216, 0.3);
      padding: 15px;
      overflow: auto;
      .active {
        border: 2px solid #2d3291;
      }
      .libraryItem {
        width: 420px;
        height: 120px;
        padding: 15px;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 4px;
        display: flex;
        margin-bottom: 10px;
        image {
          width: 108px;
          height: 80px;
        }
        .info {
          margin-left: 10px;
          line-height: 25px;
        }
      }
    }
    .chatRefion {
      flex: 1;
      display: flex;
      flex-direction: column;
      //    聊天展示区
      .chatDisplay {
        flex: 1;
        padding: 15px;
        padding-bottom: 50px;
        overflow: auto;
        .chatItemContainer {
          overflow: hidden;
        }
        .welcome {
          font-weight: 400;
          color: #666666;
          line-height: 22px;
          display: inline-block;
          width: 100%;
          text-align: center;
          margin-bottom: 15px;
        }
        .chatItem {
          display: inline-block;
          max-width: 435px;
          min-height: 40px;
          box-sizing: border-box;
          color: #333;
          text-align: left;
          padding: 12px 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .question {
          float: right;
          border-radius: 25px 25px 0px 25px;
          background: rgba(45, 50, 145, 0.2);
        }
        .answer {
          float: left;
          border-radius: 25px 25px 25px 0px;
          background: rgba(221, 221, 221, 0.2);
        }
      }
      //    输入框
      .chatInput {
        min-height: 120px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        input,
        textarea {
          padding: 15px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border: none;
          resize: none;
        }
      }
    }
  }
}
</style>