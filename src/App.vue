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
