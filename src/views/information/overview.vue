<template>
  <div>
    <div class="digital-box">
      <div class="title">数字迎宾机器人</div>
      <div class="digitalID">
        <span>ID：4567890987654</span>
        <span>产品类型：通用模式</span>
        <span>创建时间：2021-1-1 12:00:02</span>
      </div>
    </div>
    <div class="img-box">
      <img
        src="https://cdn.pixabay.com/photo/2020/01/04/18/40/trees-4741364__340.png"
        alt="img"
      />
    </div>
  </div>
</template>

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
  }
}
</style>
