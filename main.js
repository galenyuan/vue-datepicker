var datePicker = require('./src/datepicker.js');
Vue.component('datepicker', datePicker);
global.app = new Vue({
	el:"#wrap",
	data:{
		date:'2016-2-9'
	},
	methods:{
		showCalendar:function(e,parent,child){
			var ele = e.$target;
			this.$refs.datepicker.parent = parent;
			this.$refs.datepicker.child = child;
			this.$refs.datepicker.show = true;
			this.$refs.datepicker.callback = function(result){
				console.log('result is '+ result +'');
			}
		}
	}
});