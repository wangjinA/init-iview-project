<!--
 * @Author: 汪锦
 * @Date: 2020-10-15 08:47:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-20 15:03:39
 * @Description: 列表时间差动画
-->
<template>
  <transition-group
    v-bind="$attrs"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    class="hyTransitionList"
    appear
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'hyTransitionList',
  props: {
    name: {
      type: String,
      default: 'list'
    },
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
      return dom.dataset.delay ? dom.dataset.delay * 1000 : index * this.delay * 1000
    },
    beforeEnter(dom) {
      dom.classList.add(`${this.name}-enter`, `${this.name}-enter-active`)
    },
    enter(dom, done) {
      let delay = this.getDelay(dom)
      console.log(delay)
      setTimeout(() => {
        dom.classList.remove(`${this.name}-enter`)
        dom.classList.add(`${this.name}-enter-to`)
        //监听 transitionend 事件
        var transitionend = window.ontransitionend ? `transitionend` : `webkitTransitionEnd`
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd)
          done() // 调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        })
      }, delay)
    },
    afterEnter(dom) {
      dom.classList.remove(`${this.name}-enter-to`, `${this.name}-enter-active`)
    },
    beforeLeave(dom) {
      dom.classList.add(`${this.name}-leave`, `${this.name}-leave-active`)
    },
    leave(dom, done) {
      let delay = this.getDelay(dom)
      setTimeout(() => {
        dom.classList.remove(`${this.name}-leave`)
        dom.classList.add(`${this.name}-leave-to`)
        //监听 transitionend 事件
        var transitionend = window.ontransitionend ? `transitionend` : `webkitTransitionEnd`
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd)
          done() // 调用done() 告诉vue动画已完成，以触发 afterleave 钩子
        })
      }, delay)
    },
    afterLeave(dom) {
      dom.classList.remove(`${this.name}-leave-to`, `${this.name}-leave-active`)
    }
  }
}
</script>

<style lang="less">
.hyTransitionList {
  overflow: hidden;
  position: relative;
  > li,
  > div {
    width: 100%;
    // transition-duration: 0.7s;
  }
}

.list-leave-active {
  transition-delay: 0s !important;
  position: absolute;
  transition: 0.5s;
}
.list-enter {
  opacity: 0.5;
  transform: translateY(20px);
}
.list-enter-active {
  transition: 0.7s;
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
}
</style>
