export default {
  install(Vue, options = []) {
    options.forEach(item => {
      const name = Object.keys(item)[0]
      const value = item[name]
      Vue.prototype[name] = value
    })
  }
}