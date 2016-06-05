<template>
  <div class="datepicker-container">
    <input type="text" v-model="model" readonly @click="showDatepicker($event)" />

    <div class="datepicker" v-if="config.show">
      <div class="picker"></div>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['model'],

  data () {
    return {
      config: {
        show: false,
        dates: [],
        beforeMonth: [],
        afterMonth: []
      },

      style: {
        top: 0,
        left: 0
      },

      selected: {
        year: 0,
        month: 0,
        date: 0
      }
    }
  },

  ready () {
    this.init();
  },

  methods: {
    init () {
      this.render(this.model);
    },

    render (selected) {
      let date = null;

      if(selected) {
        date = getDateObj(selected);
      }else {
        date = new Date();
      }

      this.renderCurrent(date);      
    },

    showDatepicker (e) {
      console.log(e);
      this.config.show = true;
    },

    getDateObj (str) {
      let arr = str.split('-');
      return new Date(arr[0], arr[1], arr[2]);
    },

    renderCurrent (current) {
      let year = current.getFullYear(),
          month = current.getMonth(),
          date = current.getDate(),
          firstDay = this.getFirstDay(year, month),
          lastDay = this.getLastDay(year, month).getDate();

      this.setDateList(year, month, date, firstDay, lastDay);
      this.setCurrent(year, month, date)
    },

    getFirstDay (year, month) {
      return new Date(year, month, 1);
    },

    getLastDay (year, month) {
      return new Date(year, month + 1, 0);
    },

    setBeforeList (year, month, date, first) {
      let lastMonthEnd = new Date(year, month, 0).getDate();

      for (let i = lastMonthEnd, a = lastMonthEnd + 1 - first.getDay(); a <= i; i--) {
          this.config.beforeMonth.push(i);
      }
      this.config.beforeMonth.reverse();
    },

    setAfterList (year, month, date, last) {
      var lastWeekDay = new Date(year, month + 1, 0).getDay();
      for (var i = 1, a = 6 - lastWeekDay; i <= a; i++) {
          this.config.afterMonth.push(i);
      }
    },

    setDateList (year, month, date, firstDay, lastDay) {
      this.setBeforeList(year, month, date, firstDay);
      this.setAfterList(year, month, date, lastDay);

      for(let i = 1; i <= lastDay; i++ ) {
        let checked = false;
        if(i == date){
          checked = true;
        }

        this.config.dates.push({
          text: i,
          checked: checked
        });
      }
    },

    setCurrent (year, month, date) {
      let selected = this.selected;

      selected.year = year;
      selected.month = month;
      selected.date = date;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .datepicker-container {
    display: inline-block;
  }

  .datepicker {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background: #000;
      opacity: .6;
    }

    .picker {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 60%;
      height: 200px;
      z-index: 9999;
      margin: auto;
      background: #fff;
    }
  }
</style>
