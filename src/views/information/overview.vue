<template>
  <div>
    <div class="digital-box">
      <div class="title">{{ robotData.robotName }}</div>
      <div class="digitalID">
        <span>ID：{{ robotData.seriesId }}</span>
        <span>产品类型：{{ type }}</span>
        <span>创建时间：{{ robotData.createTime }}</span>
      </div>
    </div>
    <div class="img-box" v-show="robotData.pictureUrl != ''">
      <img :src="robotData.pictureUrl" alt="img" />
    </div>
  </div>
</template>

<script>
import { getdictionary, detailsList } from "@/api/robotCenter";
export default {
  data() {
    return {
      robotData: {},
      dictionary: [],
      type: "",
      seriesId: ""
    };
  },
  mounted() {
    this.seriesId = localStorage.getItem("seriesId");
    this.getdictionary();
  },
  methods: {
    // 查询字典库
    async getdictionary() {
      try {
        const res = await getdictionary("robot_type");
        if (res.code == 200) {
          this.dictionary = res.data;
          this.detailsList(this.seriesId);

          console.log(this.type);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询详情
    async detailsList(id) {
      try {
        const res = await detailsList(id);
        if (res.code == 200) {
          this.robotData = res.data;
          this.type = this.selectDictLabel(
            this.dictionary,
            this.robotData.type
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 岗位状态字典翻译
    statusFormat(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less" scoped>
.digital-box {
  border: 1px dashed #979797;

  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    line-height: 20px;
    font-weight: bold;
    color: #333333;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .digitalID {
    span {
      color: #333;
      margin-right: 70px;
    }
  }
}
.img-box {
  width: 345px;
  border: 1px dashed #979797;

  border-radius: 6px;
  img {
    width: 100%;
    border: 0;
    display: block;
    border-radius: 6px;
  }
}
</style>
