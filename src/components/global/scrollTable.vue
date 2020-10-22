<!--
 * @Author: 汪锦
 * @Date: 2020-03-16 15:20:13
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-10-20 10:57:54
 * @Description: 滚动表格
 -->
<template>
  <div class="scrollTable" @mouseenter="Stop()" @mouseleave="Up()">
    <!-- 标题 -->
    <div class="scrollTable-title" v-if="showHeader" :style="{ height: headerLineHeight + company, fontSize: titleFontSize + company }">
      <div class="title-item item-index" v-if="showIndex">序号</div>
      <div class="title-item" v-for="item in columns" :key="item.title" :style="{ flex: `0 0 ${item.width + company}` }">
        {{ item.title }}
      </div>
    </div>
    <!-- 内容 -->
    <div
      ref="scrollTableList"
      class="scrollTable-list yjcg-content-scrollbar"
      :class="{ overflowAuto: isOverflow }"
      :style="`height: ${lineHeight * showLength + spacing * (showLength - 1)}${company}`"
    >
      <!-- <div
        ref="scrollTableListBox"
        class="scrollTable-list-box"
        :style="animate && `transition: .5s; transform:translate(0, ${-lineHeight * trunCount - spacing}${company})`"
      > -->
      <transition-group ref="scrollTableListBox" tag="div" name="scrollTable" appear>
        <div
          class="scrollTable-list-box-item"
          @click="$emit('select-item', item)"
          :style="{
            backgroundColor: item.backgroundColor,
            height: lineHeight + company,
            marginBottom: spacing + company,
            fontSize: listFontSize + company
          }"
          v-for="item in list"
          :key="item.diyKey"
          :class="{ even: item.index % 2 != 1 }"
        >
          <div class="list-item item-index" v-if="showIndex">{{ item.index }}</div>
          <div class="list-item" v-for="col in columns" :key="col.key" :style="{ flex: `0 0 ${col.width + company}` }">
            <div class="text-overflow" v-if="col.key">{{ item[col.key] }}</div>
            <slot :name="col.slot" v-if="col.slot" :item="item"></slot>
          </div>
        </div>
      </transition-group>
      <div v-if="list.length == 0" class="scrollTable-list-box-item scrollNotData" :style="{ height: lineHeight + company }">
        暂无数据
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'scrollTable',
  props: {
    // 单位，默认rem
    company: {
      type: String,
      default: 'px'
    },
    // 表头行高
    headerLineHeight: {
      type: Number,
      default: 40
    },
    // 表体行高
    lineHeight: {
      type: Number,
      default: 45
    },
    // 是否显示index
    showIndex: {
      type: Boolean,
      default: false
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 时长
    duration: {
      type: Number,
      default: 3000
    },
    // 每次滚动行数
    trunCount: {
      type: Number,
      default: 1
    },
    // 表头数组 [{name: 表头名字, attr: '表体属性名', slot: '插槽名称', title: '是否显示表体', width: '宽度'}]
    columns: {
      type: Array,
      default: _ => []
    },
    // 表体数组
    data: {
      type: Array,
      default: _ => []
    },
    // 显示多少行
    showLength: {
      type: Number,
      default: 4
    },
    // 间距
    spacing: {
      type: Number,
      default: 0.08
    },
    // 标题字体大小
    titleFontSize: {
      type: Number,
      default: 18
    },
    // 列表字体大小
    listFontSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      isOverflow: false,
      timeOutNum: undefined,
      list: [],
      isOpenScroll: false
    }
  },
  watch: {
    data: {
      handler(val, oldVal) {
        this.list = [
          ...val.map((item, index) => ({
            ...item,
            index: index + 1,
            diyKey: this.getRandomCount()
          }))
        ]
        this.$nextTick(() => {
          this.setOpenScroll()
        })
        if (val.length) {
          this.$nextTick(() => {
            if (this.isOpenScroll) {
              this.ScrollUp()
            }
          })
        } else {
          this.clear()
        }
      },
      deep: true,
      immediate: true
    },
    isOpenScroll(val) {
      console.log(val)
      val ? this.Up() : this.clear()
    }
  },
  methods: {
    setOpenScroll() {
      // 判断 内容 > 容器，则开启滚动
      this.isOpenScroll = this.$refs.scrollTableListBox.$el.offsetHeight > this.$refs.scrollTableList.offsetHeight
    },
    fontSize(num) {
      return num * 100
    },
    getRandomCount(n = 18) {
      let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      let res = ''
      for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35)
        res += chars[id]
      }
      return res
    },
    ScrollUp() {
      if (this.list.length != 0) {
        this.clear()
        this.intNum = setInterval(() => {
          this.timeOutNum = setTimeout(() => {
            console.log(1)
            this.list.push(
              ...this.list.splice(0, this.trunCount).map(item => ({
                // this.list.splice(0, this.trunCount).map(item => ({
                ...item,
                diyKey: this.getRandomCount()
              }))
            )
          }, 500)
        }, this.duration)
      }
    },
    //鼠标移上去停止
    Stop() {
      if (!this.isOpenScroll) return
      this.isOverflow = true
      this.clear()
    },
    Up() {
      if (!this.isOpenScroll) return
      this.isOverflow = false
      this.ScrollUp()
    },
    clear() {
      if (this.intNum) {
        clearInterval(this.intNum)
      }
      if (this.timeOutNum) {
        clearTimeout(this.timeOutNum)
      }
    }
  },
  destroyed() {
    this.clear()
  }
}
</script>
<style lang="less" scoped>
.item-index {
  flex: none;
  max-width: 2.5em;
  box-sizing: content-box;
}
.scrollTable {
  color: #fff;
  width: 100%;
  &-title {
    // background-color: rgba(47, 116, 136, 0.5);
    // background:rgba(255,255,255,.24);
    background-color: #556c85;
    width: 100%;
    display: flex;
    align-items: center;
    font-family: 'Microsoft YaHei Bold';
    // font-weight: 700;
    position: relative;
    .title-item {
      padding: 0 3%;
      flex: 1;
      // &:nth-child(3) {
      //   flex: none;
      //   width: 0.8px;
      //   padding: 0;
      // }
    }
  }
  &-list {
    // margin-top: 0.14rem;
    overflow: hidden;
    position: relative;
    &-box {
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: rgba(112, 251, 253, 0.1);
        background: rgba(28, 52, 79, 0.7);
        // background-color: #203D5E;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        .list-item {
          padding: 0 3%;
          overflow: hidden;
          flex: 1;
          .scrollTable-tooltip {
            // .text-overflow1(1)
          }
          &.item-index {
            font-family: 'DIN-Bold';
          }
          /deep/ i {
            font-family: 'DIN-Medium';
            font-style: normal;
          }
        }
        // &.even {
        //   background: linear-gradient(
        //     0deg,
        //     rgba(66, 157, 187, 0.42620798319327735) 0%,
        //     rgba(66, 157, 187, 1) 100%
        //   );
        // }
      }
    }
    &::-webkit-scrollbar {
      /* Y滚动条宽度 */
      width: 0px;
      height: 0px;
    }
  }
  .overflowAuto {
    overflow: hidden auto !important;
  }
  // .anim {
  //   transition: all 0.5s;
  //   margin-top: -0.225px; //高度等于行高
  // }
}

// 滚动动画
.scrollTable-enter {
  transform: translateY(100%);
  opacity: 0;
}
.scrollTable-leave-to {
  transform: translateY(-100%);
}
.scrollTable-leave,
.scrollTable-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.scrollTable-leave-active {
  width: 100%;
  position: absolute;
  transition: 0.5s;
}
.scrollTable-enter-active {
  transition: 0.5s;
}
.scrollTable-move {
  transition: 0.5s;
}
</style>
