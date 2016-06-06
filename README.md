# Vue Datepicker

> Here is a Datepicker plug-in for Vuejs

## Build Setup

``` bash
# install dependencies
npm install

# run the demo at localhost:8080
npm run dev

```
##Usage
```vue
<template>
  <div id="app">
    <span>Choose Date:</span><datepicker :model.sync="date"></datepicker>
  </div>
</template>

<script>
import datepicker from './components/DatePicker'

export default {
  data () {
    return {
      date: ''
    }
  },

  components: {
    datepicker
  }
}
</script>

```
