<!--
 * @Author: 汪锦
 * @Date: 2020-07-13 09:19:58
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 11:33:48
 * @Description: 文件描述
-->
<template>
  <div id="app">
    <CommonHeader v-if="!$route.meta.hideHeader"></CommonHeader>
    <router-view
      :class="`main-view ${$route.meta.hideHeader ? 'hideHeader' : ''}`"
    />
  </div>
</template>

<script>
import CommonHeader from "@/layout/header/header";
export default {
  name: "app",
  components: {
    CommonHeader
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        console.log(route);
      }
    }
  },
  mounted() {
    window.temp = this;
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-repeat: no-repeat;
}
// 补padding-top
.main-view {
  padding-top: var(--header-height);
  height: 100vh;
  width: 100vw;
  &.hideHeader {
    padding-top: 0;
  }
}
</style>
