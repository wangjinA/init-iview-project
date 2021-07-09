<template>
  <div class="progress">
    <section><i :style="{ width: value + '%' }"></i></section>
    <span>{{ value }}%</span>
  </div>
</template>

<script>
export default {
  name: "Progress",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="less" scoped>
.progress {
  display: flex;
  align-items: center;
  > section {
    flex: 1;
    border: 1px solid #6bd6fb;
    height: 0.1rem;
    border-radius: 0.1rem;
    display: flex;
    > i {
      height: 100%;
      background-color: #6bd6fb;
    }
  }
  > span {
    margin-left: 0.05rem;
    font-size: 0.12rem;
  }
}
</style>
