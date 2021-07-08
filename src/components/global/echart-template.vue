<template>
  <div class="echart-template" :style="{ width, height }" ref="echartTemplate"></div>
</template>

<script>
export default {
  mixins: [echartMixin],
  name: "EchartTemplate",
  props: {
    option: {
      type: [Object, Function],
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {};
  },
  watch: {
    option: {
      handler: "init",
      deep: true,
    },
  },
  methods: {
    init() {
      if (!this.myChart) {
        this.myChart = this.$echarts.init(this.$refs.echartTemplate);
      } else {
        this.myChart.clear();
      }
      let option;
      if (typeof this.option === "function") {
        option = this.option();
      } else {
        option = this.$utils.deepClone(this.option);
      }
      console.log(option.textStyle.fontSize);
      this.myChart.setOption(option);

      setTimeout(() => {
        this.$nextTick(this.myChart.resize);
      }, 0);
      this.myChart.on("click", (params) => {
        this.$emit("click", params);
      });
    },
  },
  mounted() {
    this.$nextTick(this.init);
  },
};
</script>

<style lang="less" scoped>
.echart-template {
  width: 100%;
  height: 100%;
}
</style>
