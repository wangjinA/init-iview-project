<!--
 * @Author: 汪锦
 * @Date: 2020-03-25 15:32:55
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-07-09 10:28:42
 * @Description: 公共表格
 -->

<script>
const defaultStyles = {
  headerBgColor: "rgba(0,40,66,1)",
  headerColor: "rgba(0,224,255,1)",
  headerFontSize: "0.14rem",
  headerFontWeight: "normal",
  headerHeight: ".42rem",

  color: "rgba(226,247,255,1)",
  fontSize: "0.14rem",
  height: ".87rem",
  hoverColor: "transparent",

  stripeColor: ["transparent", "transparent"],
  borderColor: "#f55",
};
export default {
  name: "HyTable",
  props: {
    styles: {
      type: Object,
      default: () => {
        return {};
      },
    },
    current: {
      type: Number,
    },
    total: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    // 是否显示loading动画
    openLoading: {
      type: Boolean,
      default: true,
    },
    // 是否显示index
    showIndex: {
      type: Boolean,
      default: false,
    },
    indexPosition: {
      type: String,
      default: "left",
    },
    // 是否显示选择框
    selection: {
      type: [String, Boolean],
      default: false,
    },
    // 表头
    columns: {
      type: Array,
      default: () => [],
    },
    // 数据
    data: {
      type: Array,
      default: () => [],
    },
    // 隐藏page
    hidePage: {
      type: Boolean,
      default: false,
    },
    // 隐藏page
    border: {
      type: Boolean,
      default: false,
    },
    // 各行class
    rowClassName: {
      type: Function,
      default: () => "", // 返回各行class,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    colData() {
      let data = [...this.columns].map((item) => ({ tooltip: true, ...item }));
      if (this.showIndex) {
        data = [{ title: "序号", key: "tableIndex", width: 70, align: "center" }, ...data];
      }
      if (this.selection) {
        // 判断是否需要显示选择框
        if (this.selection === "right")
          data = [...data, { type: "selection", width: 60, align: "center" }];
        else data = [{ type: "selection", width: 120, align: "center" }, ...data];
      }
      return data;
    },
    tableData() {
      let data = [...this.data];
      if (this.showIndex) {
        data = data.map((item, index) => ({ tableIndex: index + 1, ...item }));
      }
      return data;
    },

    computed_styles() {
      let styles = { ...defaultStyles, ...this.styles };
      let stylesObj = {};

      for (const [key, value] of Object.entries(styles)) {
        let varName = `--${key}`;
        stylesObj[varName] = value;
      }
      delete stylesObj["--stripeColor"];
      stylesObj["--stripeColor1"] = styles.stripeColor[0];
      stylesObj["--stripeColor2"] = styles.stripeColor[1];
      return stylesObj;
    },
  },
  render(h) {
    return h("div", {}, [
      h("Table", {
        class: "hyTable",
        style: {
          ...this.computed_styles,
        },
        attrs: {
          size: "large",
          stripe: true, // 表格会间隔显示不同颜色，用于区分不同行数据
          highlightRow: true, // 高亮选中行
          columns: this.colData,
          data: this.tableData,
          loading: this.loading,
          border: this.border,
          "row-class-name": this.rowClassName,
        },
        on: {
          "on-row-click": (row) => {
            this.$emit("on-row-click", row);
          },
          "on-selection-change": (selection) => {
            this.$emit("on-selection-change", selection);
          },
        },
        ref: "hyTable",
        scopedSlots: this.$scopedSlots, // 跨层级传递slot
      }),
      !this.hidePage && this.total > this.pageSize
        ? h("Page", {
            class: "common",
            attrs: {
              current: this.current,
              total: this.total,
              "page-size": this.pageSize,
              showTotal: true,
              styles: {
                textAlign: "center",
                margin: "15px 0",
                userSelect: "none",
                li: {
                  color: "#f55!important",
                  borderColor: "#f55",
                },
              },
            },
            ref: "hyPage",
            on: {
              "update:current": (page) => {
                this.$emit("update:current", page);
                this.$parent.current = page;
                if (typeof this.$parent.f5 === "function") {
                  this.loading = this.openLoading;
                  this.$parent.f5().finally(() => {
                    this.loading = false;
                  });
                }
              },
            },
          })
        : "",
    ]);
  },
  methods: {
    getTable() {
      return this.$refs.hyTable;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
// 加载样式
/deep/ .ivu-spin-fix {
  background-color: rgba(5, 26, 70, 0.8);
  border: none !important;
  .ivu-spin-dot {
    background-color: #fff;
  }
}
/deep/ .hyTable.ivu-table-wrapper {
  &.ivu-table-wrapper-with-border {
    border-color: var(--borderColor);
  }
  .ivu-table {
    background-color: transparent;
    color: #fff;
    font-size: 18px;
    &.ivu-table-border::before,
    &.ivu-table-border::after {
      background: var(--borderColor);
    }
    &.ivu-table-wrapper-with-border,
    &.ivu-table-border td,
    &.ivu-table-border th {
      border-color: var(--borderColor);
    }
    &::before {
      height: 0;
    }
    .ivu-checkbox-inner {
      height: 16px;
      width: 16px;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner {
      border-color: #0f0;
      background-color: #0f0;
      &::after {
        width: 7px;
        height: 12px;
        position: absolute;
        top: -1px;
        left: 4px;
      }
    }

    .ivu-table-header {
      .ivu-checkbox-inner {
        width: 20px;
        height: 20px;
      }
      .ivu-checkbox-checked .ivu-checkbox-inner {
        &::after {
          width: 8px;
          height: 13px;
          position: absolute;
          top: 0px;
          left: 6px;
        }
      }
    }
    .ivu-table-cell {
      overflow: initial; // 文本缺陷
    }
    tr.ivu-table-row-hover td {
      // background-color: var(--hoverColor) !important;
    }
    td {
      color: var(--color);
      font-size: var(--fontSize);
      background-color: transparent;
    }
    th,
    td {
      height: var(--height) !important;
      box-sizing: border-box;
      line-height: 1.5;
      // border: 0;
    }
    th {
      font-size: var(--headerFontSize);
      font-weight: var(--headerFontWeight);
      height: var(--headerHeight) !important;
      background-color: var(--headerBgColor);
      color: var(--headerColor);
    }
    &.ivu-table-stripe {
      .ivu-table-body tr:nth-child(2n-1) td {
        background-color: var(--stripeColor1);
      }
      .ivu-table-body tr:nth-child(2n) td {
        background-color: var(--stripeColor2);
      }
    }
  }
}
</style>
