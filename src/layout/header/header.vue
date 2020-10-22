<template>
  <div class="st-header">
    <div class="st-header-title" @click="$router.push('/')">汕头市应急管理综合应用平台</div>
    <transition appear name="showScale">
      <ul class="st-header-nav" v-if="!$route.meta.hideNav">
        <li v-for="(item, index) in navList" :key="index" :class="$route.path == item.path && 'active'" @click="navHandler(item)">{{ item.name }}</li>
      </ul>
    </transition>
    <div class="current-date">{{ currentDate }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          name: '专题首页',
          path: '/'
        },
        {
          name: '汛旱风监测',
          path: '/windWatch'
        },
        {
          name: '信息管理',
          path: '/infoManage'
        }
        // {
        //   name: '统一门户',
        //   path: '/portal'
        // }
      ],
      currentDate: ''
    }
  },
  methods: {
    setCurrentDate() {
      this.currentDate = this.$utils.getDateTimeFormat(Date.now(), 'yyyy.MM.dd hh:mm:ss')
    },
    navHandler(item) {
      this.$router.push(item.path)
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.setCurrentDate()
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.st-header {
  height: var(--header-height);
  padding: 0 30px;
  .bg-style('./header.png');
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;
  &-title {
    font-size: 34px;
    height: var(--header-height);
    line-height: var(--header-height);
    font-family: 'ShiShangZhongHeiJianTi';
    .hover();
  }
  &-nav {
    height: 63px;
    font-size: 22px;
    margin-left: 150px;
    .flex-center();
    > li {
      margin: 0 25px;
      padding: 5px 0;
      border-bottom: 2px solid transparent;
      color: rgba(255, 255, 255, 0.6);
      &:hover,
      &.active {
        cursor: pointer;
        color: #fff;
        border-color: #8ae9ee;
      }
    }
  }
  .current-date {
    font-size: 22px;
    color: rgba(138, 234, 238, 1);
    height: var(--header-height-min);
    line-height: var(--header-height-min);
    margin-left: auto;
    margin-right: 32px;
    letter-spacing: 3px;
    user-select: none;
    font-family: 'DIN-Regular';
  }
}
</style>
