var app = new Vue({
	el:"#wrap",
	data:{
		dateResult:'',
		date:'2016-2-9'
	},
	methods:{
		showCalendar:function(e,parent,child){
			this.$refs.datepicker.parent = parent;
			this.$refs.datepicker.child = child;
			this.$refs.datepicker.show = true;
			this.$refs.datepicker.callback = function(result){
				console.log(result);
			}
		}
	}
});