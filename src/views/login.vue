<template>
  <div class="login">
    <h1 class="flex-center">登陆页面</h1>
    <router-link to="/welcome">点击登陆</router-link>
  </div>
</template>

<script>
export default {
  name: 'login',
  components: {}
}
</script>

<style lang="less" scoped>
h1 {
  .flex-center();
}
</style>
