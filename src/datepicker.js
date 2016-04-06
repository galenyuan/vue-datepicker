/*
 * Vue-datepicker
 * Galen Yuan
 * 363693158@qq.com
 */
'use strict';
window.DatePicker = window.DatePicker || {};
DatePicker.install = function(Vue, options) {
    var defaults = {
        event: 'focus',
        callback: function(result) {
            console.log(result);
        }
    };
    for (var a in defaults) {
        if (options[a] === undefined) {
            options[a] = defaults[a];
        }
    }
    Vue.directive('datepicker', {
        bind: function() {
            var dir = this,
                vm = this.vm,
                el = this.el,
                model = 'vm.' + dir.expression + '',
                component = vm.$refs.datepicker;
            component.callback = options.callback;
            el.addEventListener(options.event, function(e) {
                component.show = true;
                component.x = e.target.offsetLeft;
                component.y = e.target.offsetTop + e.target.offsetHeight + 10;
                component.expression = dir.expression;
            })
        }
    })
    Vue.component('datepicker', {
        template: require('./datepicker.html'),
        replace: true,
        inherit: true,
        data: function() {
            return {
                show: false,
                x: 0,
                y: 0,
                view: {
                    dateView: true,
                    monthView: false,
                    yearView: false
                },
                current: {
                    year: 0,
                    month: 0,
                    date: 0,
                    weekDay: 0
                },
                dateList: [],
                beforeDateList: [],
                afterDateList: [],
                monthList: [],
                yearList: []
            }
        },
        created: function() {
            this.render();
        },
        methods: {
            init: function() {
                this.current.year = 0;
                this.current.moneth = 0;
                this.current.date = 0;
                this.current.weekDay = 0;
                this.dateList.forEach(function(c, i) {
                    if (c.checked) {
                        c.checked = false;
                    }
                });
            },
            render: function(model) {
                if (model) {
                    var currentDate = this.inputDate(model);
                } else {
                    var currentDate = new Date();
                }
                var currentYear = currentDate.getFullYear();
                var currentMonth = currentDate.getMonth();
                var currentWeekDay = currentDate.getDay();
                var currentFirstDay = new Date(currentYear, currentMonth, 1);
                var currentLastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
                this.current.year = currentYear;
                this.current.month = currentMonth + 1;
                this.current.date = currentDate.getDate();
                this.current.weekDay = currentDate.getDay();
                this.dateList = [];
                for (var i = 1; i <= currentLastDay; i++) {
                    var a = {
                        date: i,
                        checked: false
                    }
                    if (currentDate.getDate() === i) a.checked = true;
                    this.dateList.push(a);
                }
                this.beforeDateList = [];
                var lastMonthEnd = new Date(currentYear, currentMonth, 0).getDate();
                for (var i = lastMonthEnd, a = lastMonthEnd + 1 - currentFirstDay.getDay(); a <= i; i--) {
                    this.beforeDateList.push(i);
                }
                this.beforeDateList.reverse();
                this.afterDateList = [];
                var currentLastWeekDay = new Date(currentYear, currentMonth + 1, 0).getDay();
                for (var i = 1, a = 6 - currentLastWeekDay; i <= a; i++) {
                    this.afterDateList.push(i);
                }
            },
            checkDate: function(item) {
                this.dateList.forEach(function(c, i) {
                    if (c.checked) {
                        c.checked = false;
                    }
                });
                item.checked = true;
                this.current.date = item.date;
            },
            prevMonth: function(currentMonth) {
                this.current.month = currentMonth - 1;
                if (currentMonth === 1) {
                    this.current.month = 12;
                    this.prevYear(this.current.year);
                }
                this.current.date = 1;
                var d = new Date(this.current.year, this.current.month - 1, this.current.date);
                var prevDate = this.outputDate(d)
                this.render(prevDate);
            },
            nextMonth: function(currentMonth) {
                this.current.month = currentMonth + 1;
                if (currentMonth === 12) {
                    this.current.month = 1;
                    this.nextYear(this.current.year);
                }
                this.current.date = 1;
                var d = new Date(this.current.year, this.current.month - 1, this.current.date);
                var nextDate = this.outputDate(d);
                this.render(nextDate);
            },
            nextYear: function(currentYear) {
                this.current.year = ++currentYear;
            },
            prevYear: function(currentYear) {
                if (currentYear > 100) {
                    this.current.year = --currentYear;
                }
            },
            nextNineYear: function(currentYear) {
                this.current.year = currentYear + 9;
                this.renderYearPanel();
            },
            prevNineYear: function(currentYear) {
                this.current.year = currentYear - 9;
                this.renderYearPanel();
            },
            inputDate: function(str) {
                var a, r;
                a = str.split('-');
                a[1] = parseInt(a[1]);
                a[1]--;
                r = new Date(a[0], a[1], a[2]);
                return r;
            },
            outputDate: function(date) {
                var r, y, m, d;
                y = date.getFullYear();
                m = date.getMonth();
                d = date.getDate();
                m++;
                r = y + '-' + m + '-' + d;
                return r;
            },
            confirmDate: function() {
                var vm = this;
                vm.show = false;
                var a = new Date(vm.current.year, vm.current.month - 1, vm.current.date);
                var result = vm.outputDate(a);
                vm.result = result;
                eval('vm.$parent.' + vm.expression + ' = result');
                vm.callback(result);
            },
            cancel: function() {
                this.init();
                this.show = false;
            },
            chooseMonth: function(item) {
                this.current.month = item.num;
                this.togglePanel('date');
            },
            chooseYear: function(item) {
                this.current.year = item;
                this.togglePanel('month');
            },
            renderYearPanel: function() {
                var vm = this;
                var s = vm.current.year - 4,
                    e = vm.current.year + 4,
                    l = [];
                for (var i = s; i <= e; i++) {
                    l.push(i);
                }
                vm.yearList = l;
                vm.view.monthView = false;
                vm.view.yearView = true;
            },
            renderMonthPanel: function() {
                var vm = this;
                vm.current.month = 0;
                vm.current.date = 0;
                vm.current.weekDay = 0;
                var l = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'];
                if (!vm.monthList.length) {
                    l.forEach(function(c, i) {
                        vm.monthList.push({
                            num: i + 1,
                            text: c
                        });
                    });
                }
                vm.view.monthView = true;
            },
            togglePanel: function(name) {
                this.view.dateView = false;
                this.view.monthView = false;
                this.view.yearView = false;
                if (name === 'month') {
                    this.renderMonthPanel();
                } else if (name === 'year') {
                    this.renderYearPanel();
                } else if (name === 'date') {
                    this.dateList.forEach(function(c, i) {
                        if (c.checked) {
                            c.checked = false;
                        }
                    });
                    this.view.dateView = true;
                }
            }
        },
        watch: {
            'show': function(newVal, oldVal) {
                var m = eval('this.$parent.' + this.expression + '');
                var r = new Date(m);
                if (isNaN(r.valueOf())) {
                    this.render();
                } else if (newVal && m) {
                    this.render(m);
                } else if (newVal && !m) {
                    this.render();
                }
            }
        }
    });
}
