Place the plugin in your project.

```js
import ExternalBindPlugin from './externalBind'

const store = Vue.observable({
  your_props_here: true
})

Vue.use(ExternalBindPlugin, [
  { '$state': store }
])

new Vue({
  created() {
    console.log(this.$state.your_props_here)
  }
})
```