<template>
  <div class="datepicker-container">
    <input type="text" v-model="model" readonly @click="showDatepicker($event)" />

    <div class="datepicker" v-if="config.show">
      <div class="picker">
        <div class="picker-header">
          <a class="picker-arrow arrow-left" href="javascript:;" @click="goToMonth('prev')"><</a><a class="picker-header-title" href="javasciprt:;">
            <span v-if="selected.year !== null">{{selected.year}}年</span>
            <span v-if="selected.month !== null">{{selected.month + 1}}月</span>
            <span v-if="selected.date !== null">{{selected.date}}日</span>
          </a><a class="picker-arrow arrow-right" href="javascript:;" @click="goToMonth('next')">></a>
        </div>
        <div class="picker-content">
          <div class="picker-content-item" v-for="item in config.weekDay">{{item}}</div>
        </div>
        <div class="picker-content">
          <div class="picker-content-item picker-content-item-date disabled" v-for="item in config.beforeMonth">{{item}}</div>
          <div class="picker-content-item picker-content-item-date" v-for="item in config.dates" v-bind:class="{selected : item.selected}" @click="setDate(item)">{{item.text}}</div>
          <div class="picker-content-item picker-content-item-date disabled" v-for="item in config.afterMonth">{{item}}</div>
        </div>
      </div>

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
        afterMonth: [],
        weekDay: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat']
      },

      style: {
        top: 0,
        left: 0
      },

      selected: {
        year: null,
        month: null,
        date: null
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
        date = this.getDateObj(selected);
      }else {
        date = new Date();
      }

      this.renderCurrent(date);      
    },

    showDatepicker (e) {
      this.config.show = true;
    },

    getDateObj (str) {
      let arr = str.split('-');
      return new Date(arr[0], --arr[1], arr[2]);
    },

    getDateStr (obj) {
      let year = obj.getFullYear().toString(),
          month = (obj.getMonth() + 1).toString(),
          date = obj.getDate().toString();

      return year + '-' + month + '-' + date;
    },

    renderCurrent (current) {
      let year = current.getFullYear(),
          month = current.getMonth(),
          date = current.getDate(),
          firstDay = this.getFirstDay(year, month),
          lastDay = this.getLastDay(year, month).getDate();

      this.setDateList(year, month, date, firstDay, lastDay);
      this.setCurrent(year, month, date);
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
      this.config.dates = [];
      this.config.beforeMonth = [];
      this.config.afterMonth = [];

      this.setBeforeList(year, month, date, firstDay);
      this.setAfterList(year, month, date, lastDay);

      for(let i = 1; i <= lastDay; i++ ) {
        let selected = false;
        if(i == date){
          selected = true;
        }

        this.config.dates.push({
          text: i,
          selected: selected
        });
      }
    },

    setCurrent (year, month, date) {
      let selected = this.selected;

      selected.year = year;
      selected.month = month;
      selected.date = date;
    },

    goToMonth (month) {
      let res = this.selected.month;

      if(month == 'next') {
        res ++;
      }else if(month =='prev') {
        res --;
      }else {
        res = month;
      }

      res = this.validMonth(res);
      let str = this.getDateStr(new Date(this.selected.year, res, this.selected.date));

      this.render(str);
    },

    setDate(item) {
      this.config.dates.forEach((date) => {
        if(date.selected) {
          date.selected = false;
        }
      });

      item.selected = true;
      this.selected.date = item.text;
    },

    validMonth (month) {
      if(month < 0 || month >= 12) {
        if(month < 0) {
          this.selected.year--;
          return 11;
        }else {
          this.selected.year++;
          return 0;
        } 
      } else {
        return month;
      }
    } 
  },

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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 240px;
      z-index: 9999;
      margin: auto;
      padding: 10px;
      background: #fff;

      &-header {
        white-space: nowrap;
        padding-top: 5px;
        padding-bottom: 5px;

        a {
          display: inline-block;
          white-space: normal;
        }
        .picker-arrow {
          width: 10%;
          text-align: center;
        }
        &-title {
          width: 80%;
          text-align: center;
        }
      }
      &-content {
        padding-top: 5px;
        padding-bottom: 5px;
        &-item {
          display: inline-block;
          width:14%;
          text-align: center;
          &-date {
            padding-top: 5px;
            padding-bottom: 5px;
          }
          &.selected {
            color: red;
          }
          &.disabled {
            color: #c7c7cc;
          }
        }
      }
    }
  }
</style>
