<template>
  <div class="thirdPartyKnowledge">
    <div class="cartContain scrollbar">
      <CartItem
        v-for="item in listData"
        :key="item.id"
        :data="item"
        @deleteItem="deleteItem"
        @editItem="editItem"
      ></CartItem>
      <div v-show="!listData.length" class="hint">暂无内容...</div>
    </div>
  </div>
</template>

<script>
import { getKnowList } from "@/api/api";
import { Message } from "@/utils/importFile";
import CartItem from "./components/CartItem";
export default {
  components: { CartItem },
  data() {
    return {
      pages: {
        pageIndex: 1,
        pageSize: 1000,
        totalCount: 0,
      },
      listData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList(search = {}) {
      try {
        let { pageIndex, pageSize } = this.pages;
        let newData = Object.assign(
          { dataSource: 3, pageIndex, pageSize },
          search
        );
        const res = await getKnowList(newData);
        if (res.code !== 200) Message.error(res.msg);
        let { nodeList, totalCount } = res.data;
        this.listData = nodeList;
        this.pages.totalCount = totalCount;
      } catch (error) {
        console.log(error);
      }
    },
    // 删除
    deleteItem() {
      Message.error("暂无权删除知识库！");
    },
    // 编辑
    editItem() {
      Message.error("暂无权编辑知识库！");
    },
  },
};
</script>

<style lang="less" scoped>
.cartContain {
  overflow: auto;
  height: 550px;
  .hint {
    text-align: center;
    line-height: 200px;
    color: #aaa;
  }
}
</style>