<template>
  <div class="thirdPartyKnowledge">
    <div class="cartContain scrollbar">
      <CartItem v-for="item in 19" :key="item"></CartItem>
    </div>
  </div>
</template>

<script>
import CartItem from "./components/CartItem";
export default {
  components: { CartItem },
};
</script>

<style lang="less" scoped>
.cartContain {
  overflow: auto;
  height: 550px;
}
</style>