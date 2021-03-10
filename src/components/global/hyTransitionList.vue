<!--
 * @Author: 汪锦
 * @Date: 2020-10-15 08:47:18
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-03-10 10:54:15
 * @Description: 列表时间差动画
-->
<template>
  <transition-group v-bind="$attrs" @before-enter="beforeEnter" @after-enter="afterEnter" :class="['hyTransitionList']" tag="div" name="list" appear>
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'hyTransitionList',
  props: {
    delay: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {}
  },
  methods: {
    getDelay(dom) {
      // 获取延迟时间
      const VNodeList = this.$slots.default // 默认插槽的列表
      const index = VNodeList.findIndex(VNode => VNode.elm === dom) // 当前dom的下标
      return dom.dataset.delay ? dom.dataset.delay : index * this.delay
    },
    beforeEnter(dom) {
      let delay = this.getDelay(dom)
      dom.transitionDelay = dom.style.transitionDelay // 做下标记，动画完成再还原
      dom.style.transitionDelay = `${delay}s`
    },
    afterEnter(dom) {
      dom.style.transitionDelay = dom.transitionDelay // 还原
    }
  }
}
</script>

<style lang="less">
.hyTransitionList {
  position: relative;
  transition: 0.3s;
  > li,
  > div {
    width: 100%;
  }
}

.list-leave-active {
  position: absolute;
  transition: 0.3s;
}
.list-enter {
  opacity: 0.5;
  transform: translateY(20px);
}
.list-enter-active {
  transition: 0.5s;
}
.list-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.list-leave {
  transform: translateX(0px);
}
.list-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}
.list-move {
  transition: 0.3s;
}
</style>
