<template>
  <div class="chatRoom">
    <div class="btnContainer">
      <div class="myBtn myBtn_blue myBtn_plain myBtn_plain_blue" @click="$router.go(-1)">
        <img src="@/assets/images/arrow.png" alt />
        返回
      </div>
    </div>
    <div class="contentContainer">
      <!-- 知识库列表 -->
      <div class="libraryList">
        <div
          :class="{ libraryItem: true, active: activeId == item.id }"
          v-for="item in ruleForm"
          :key="item.id"
          @click="chooseItem(item.id)"
        >
          <img :src="item.iconUrl" alt />
          <div class="info">
            <div class="title">{{ item.name }}</div>
            <div class="explain">
              <span class="label">说明：</span>

              <span class="content two_ellipsis">{{ item.remark }}</span>
            </div>
            <div class="time">
              <span class="label">时间：</span>
              <span class="content two_ellipsis">{{ item.createTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chatRefion">
        <!-- 聊天展示区 -->
        <div ref="chatDisplay" class="chatDisplay">
          <span class="welcome">数字迎宾机器人，为您服务~</span>
          <div class="chatItemContainer" v-for="(item, index) in messageList" :key="index">
            <div
              :class="{
                chatItem: true,
                [item.type == 1 ? 'question' : 'answer']: true
              }"
            >{{ item.message }}</div>
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
import { getKnowInfo, chatTest } from "@/api/api";
import { getconfiguredList } from "@/api/robotCenter";
import { Message } from "element-ui";
export default {
  data() {
    return {
      messageList: [],
      ruleForm: [],
      id: null,
      robotId: null,
      activeId: null,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getKnowInfo(this.id);
    } else if (this.$route.params.robotId) {
      this.robotId = this.$route.params.robotId;
      this.getconfiguredList(this.robotId);
    } else {
      this.$router.go(-1);
    }
  },
  methods: {
    // 查询知识库详情
    async getKnowInfo(domainId) {
      try {
        const res = await getKnowInfo({ domainId });
        if (res.code !== 200) return Message.error(res.msg);
        this.ruleForm = [res.data];
        this.activeId = this.ruleForm[0].id;
      } catch (error) {
        console.log(error);
      }
    },
    // 发送信息
    async sendMsg(msg) {
      try {
        const res = await chatTest({ libraryId: this.activeId, question: msg });
        const { code, data } = res;
        if (code !== 200) Message.error(res.msg);
        this.messageList.push({ message: data, type: 2 });
        this.$refs.chatDisplay.scrollTop = this.$refs.chatDisplay.scrollHeight;
      } catch (error) {}
    },
    // 通过机器人ID查询
    async getconfiguredList(robotId) {
      try {
        const res = await getconfiguredList({
          pageNum: 1,
          pageSize: 1000,
          robotId,
        });
        if (res.code !== 200) return Message.error(res.msg);
        this.ruleForm = res.rows;
        this.activeId = this.ruleForm[0].id;
        console.log(res, "robotId");
      } catch (error) {
        console.log(error);
      }
    },
    chooseItem(id) {
      if (id === this.activeId) return false;
      this.activeId = id;
      this.messageList = [];
    },
    send(e) {
      if (e.keyCode !== 13 || e.target.value.trim() == "") return false;
      let msg = e.target.value;
      if (msg.trim() == "") return false;
      this.messageList.push({ message: msg, type: 1 });
      this.sendMsg(msg);
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
        img {
          width: 108px;
          height: 80px;
        }
        .info {
          margin-left: 10px;
          line-height: 23px;
          .explain,
          .time {
            display: flex;
            .label {
              width: 40px;
            }
            .content {
              flex: 1;
            }
            // .two_ellic
          }
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
