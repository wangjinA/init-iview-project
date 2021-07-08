export const echartMixin = {
  props: {
    openInterval: {
      // 打开定时器refresh动画  默认开启定时器
      type: Boolean,
      default: true
    },
    duration: {
      // 多少毫秒执行一次
      type: Number,
      default: 8000
    }
  },
  methods: {
    __clearInterval() {
      // 销毁定时器
      clearInterval(this.private_timer)
    },
    __openInterval() {
      // 开启定时器
      this.private_timer = setInterval(() => {
        this.refresh(true)
      }, this.duration)
    },
    refresh(relationReize = false) {
      // relationReize：是否关联定时器，可能需要被其他组件调用
      if (relationReize && !this.openInterval) {
        return this.__clearInterval()
      }
      let myChart = this.myChart
      if (myChart) {
        let option = myChart.getOption()
        myChart.clear()
        myChart.setOption(option)
      }
    },
    resize() {
      this.myChart && this.myChart.resize()
    }
  },
  mounted() {
    if (this.openInterval) {
      this.__openInterval()
    }
    this.$bus_$on('resize', () => {
      // 存在myChart对象则并且窗口发生变化的时候Resize
      if (this.myChart) {
        if (this.myChart.resize && typeof this.myChart.resize === 'function') {
          this.myChart.resize()
        }
        if (typeof this.option === 'function') {

          this.myChart.dispose()
          delete this.myChart
          this.init()
        }
      }
    })
  },
  destroyed() {
    this.__clearInterval() // 销毁定时器
  }
}
export default echartMixin
