<template>
  <div class="st-header">
    <div class="st-header-menu" v-if="$route.meta.showMenu">
      <img src="./images/menu-icon.png" />
      <ul class="st-header-menuList">
        <li v-for="(item, index) in navList" :key="index" :class="$route.path == item.path && 'active'" @click="navHandler(item)">{{ item.name }}</li>
      </ul>
    </div>
    <div class="st-header-title" @click="$router.push('/')">
      汕头市应急管理综合应用平台
      <img src="./images/guang.png" />
    </div>
    <!-- <transition appear name="showScale">
      <ul class="st-header-nav" v-if="!$route.meta.hideNav">
        <li v-for="(item, index) in navList" :key="index" :class="$route.path == item.path && 'active'" @click="navHandler(item)">{{ item.name }}</li>
      </ul>
    </transition> -->
    <!-- <div class="current-date">{{ currentDate }}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        // {
        //   name: '汛旱风概览',
        //   path: '/'
        // },
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
    navHandler(item) {
      this.$router.push(item.path)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.st-header {
  height: var(--header-height);
  padding: 0 30px;
  display: flex;
  justify-content: center;
  .bg-style('./images/header.png');
  // background-color: #070d1c;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
  &-menuList {
    .bg-style('./images/menu-bg.png');
    width: 137px;
    position: absolute;
    left: 0;
    top: 40px;
    font-size: 18px;
    padding: 6px 8px;
    display: none;
    > li {
      height: 40px;
      line-height: 40px;
      padding: 0 7px;
      &:hover,
      &.active {
        cursor: pointer;
        color: #8bedff;
      }
      & + li {
        border-top: 1px solid rgba(139, 238, 255, 0.5);
      }
    }
  }
  &-menu {
    position: absolute;
    left: 15px;
    top: 30px;
    padding: 10px;
    padding-right: 30px;
    &:hover {
      @keyframes showMenu {
        0% {
          transform: scaleY(0);
          opacity: 0.3;
        }
        100% {
          transform: scaleY(100%);
          opacity: 1;
        }
      }
      .st-header-menuList {
        transform-origin: top;
        display: block;
        animation: showMenu 0.3s;
      }
    }
    > img {
      cursor: pointer;
    }
  }
  &-title {
    font-size: 38px;
    padding-top: 10px;
    font-family: 'ShiShangZhongHeiJianTi';
    width: 704px;
    display: flex;
    justify-content: center;
    position: relative;
    .hover();
    & > img {
      position: absolute;
      bottom: -72px;
      user-select: none;
      pointer-events: none;
    }
  }
}
</style>
