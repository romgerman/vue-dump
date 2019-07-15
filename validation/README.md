# Vue Validation

Recently i was thinking about form validation layer for Vue. Yes, there are already some popular libraries like Vuelidate and VeeValidate. But they seem pretty bloated and hard to understand. So i remade a classic approach into some weird thingy which separates validation, data and other stuff (almost separates).

(But anyway, if everyone was happy about using classical approach then why are people making libraries?)

## Classical

```js
<form>
  <span v-if="checkText">Everything is alright<br></span>
  <span v-else>There is some errors<br></span>
  <input type="text" v-model="text">
</form>

// ...

export default {
  name: "App",
  data() {
    return {
      text: 'test'
    }
  },
  computed: {    
    checkText() {
      return this.text.length > 5 && /[0-9]+/.test(this.text)
    }
  }
}
```

## Mine

Add this directive to your code

```js
Vue.directive("validate", function(el, binding) {  
  const value = binding.value
  const keys = Object.keys(binding.value)
  const errors = []
  let isValid = true

  for (let i = 0; i < keys.length; i++) {    
    let prop = value[keys[i]]

    if (typeof prop !== 'function')
      continue

    if (!prop(binding.value)) {
      isValid = false
      errors.push(keys[i])
    }
  }
  
  if (binding.oldValue && binding.oldValue.success === isValid)
    return

  Vue.set(binding.value, 'success', isValid)
  Vue.set(binding.value, 'errors', errors)  
})
```

And add a bunch of checks into your component `data`

For example:

```js
export default {
  name: "App",
  data() {    
    return {
      text: "hey",
      validate: {
        text: {
          length: () => this.text.length >= 5,
          numerical: () => /[0-9]+/.test(this.text),
          // success: boolean, errors: array
        },
        // ... other validations
      }
    };
  }
}
```

And in your template you just add the directive to your input field

```html
<form>
  <span v-if="validate.text.success">Everything is alright<br></span>
  <span v-else>There is some errors<br></span>
  <input type="text" v-validate="validate.text" v-model="text">
</form>
```

???

PROFIT!
