var datePicker = require('./src/datepicker.js');
Vue.component('datepicker', datePicker);
global.app = new Vue({
	el:"#wrap",
	data:{
		date:'test'
	},
	methods:{
		showCalendar:function(parent,child){
			this.$refs.datepicker.parent = parent;
			this.$refs.datepicker.child = child;
			this.$refs.datepicker.show = true;
			this.$refs.datepicker.callback = function(result){
				console.log('result is '+ result +'');
			}
		}
	}
});