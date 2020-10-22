export const globalMixins = {
  methods: {
    $setTimeout(fn, timeout = 0) {
      let id = setTimeout(() => {
        fn()
      }, timeout);
      this._timeout_stack.push(id)
      return id
    },
    $clearAllTimeOut() {
      this._timeout_stack.forEach(id => {
        clearTimeout(id)
      });
    }
  },
  created() {
    this._timeout_stack = []
  },
  destroyed() {
    this.$clearAllTimeOut()
  }
}

export default globalMixins