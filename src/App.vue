<template>
  <div id="app">
    <datepicker :model="date"></datepicker>
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
