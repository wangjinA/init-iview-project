<!--
 * @Author: 汪锦
 * @Date: 2020-07-13 09:19:58
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-22 15:27:18
 * @Description: 文件描述
-->
<template>
  <div id="app">
    <template v-if="!$route.meta.hideHeader">
      <CommonHeader></CommonHeader>
    </template>
    <router-view :class="`main-view ${$route.meta.hideHeader ? 'hideHeader' : ''}`" />
  </div>
</template>

<script>
import CommonHeader from '@/layout/header/header'
export default {
  name: 'app',
  components: {
    CommonHeader
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        console.log(route)
      }
    }
  },
  mounted() {
    window.temp = this
  }
}
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
