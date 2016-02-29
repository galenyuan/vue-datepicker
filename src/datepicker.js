module.exports = {
	template: require('./datepicker.html'),
	replace: true,
	inherit: true,
	data:function(){
		return {
			show:false,
			current:{
				year:0,
				month:0,
				date:0,
				weekDay:0
			},
			dateList:[],
			beforeDateList:[],
			afterDateList:[],
		}
	},
	created:function(){
		this.render();
	},
	methods:{
		init:function(){
			this.current.year = 0;
			this.current.moneth = 0;
			this.current.date = 0;
			this.current.weekDay = 0;
		},
		render:function(model){
			if(model){
				var currentDate = this.inputDate(model);
			}else{
				var currentDate = new Date();
			}
			var currentYear = currentDate.getFullYear();
			var currentMonth = currentDate.getMonth();
			var currentWeekDay = currentDate.getDay();
			var currentFirstDay = new Date(currentYear,currentMonth,1);
			var currentLastDay = new Date(currentYear,currentMonth+1,0).getDate();
			this.current.year = currentYear;
			this.current.month = currentMonth + 1;
			this.current.date = currentDate.getDate();
			this.current.weekDay = currentDate.getDay();
			this.dateList = [];
			for(var i=1;i<=currentLastDay;i++){
				var a = {
					date:i,
					checked:false
				}
				if(currentDate.getDate()===i) a.checked = true;
				this.dateList.push(a);
			}
			this.beforeDateList = [];
			var lastMonthEnd = new Date(currentYear,currentMonth,0).getDate();
			for(var i=lastMonthEnd,a=lastMonthEnd+1-currentFirstDay.getDay();a<=i;i--){
				this.beforeDateList.push(i);
			}
			this.beforeDateList.reverse();
			this.afterDateList = [];
			var currentLastWeekDay = new Date(currentYear,currentMonth+1,0).getDay();
			for(var i=1,a=6-currentLastWeekDay;i<=a;i++){
				this.afterDateList.push(i);
			}
		},
		checkDate:function(item){
			for(var i=0,a=this.dateList.length;i<a;i++){
				if(this.dateList[i].checked){
					this.dateList[i].checked = false;
				}
			}
			item.checked = true;
			this.current.date = item.date;
		},
		prevMonth:function(currentMonth){
			this.current.month = currentMonth - 1;
			if(currentMonth===1){
				this.current.month = 12;
				this.current.year--;
			}
			this.current.date = 1;
			var d = new Date(this.current.year,this.current.month-1,this.current.date);
			var prevDate = this.outputDate(d)
			this.render(prevDate);
		},
		nextMonth:function(currentMonth){
			this.current.month = currentMonth + 1;
			if(currentMonth===12){
				this.current.month = 1;
				this.current.year++;
			}
			this.current.date = 1;
			var d = new Date(this.current.year,this.current.month-1,this.current.date);
			var nextDate = this.outputDate(d);
			this.render(nextDate);
		},
		inputDate:function(str){
			var a,r;
			a = str.split('-');
			a[1] = parseInt(a[1]);
			a[1]--;
			r = new Date(a[0],a[1],a[2]);
			return r;
		},
		outputDate:function(date){
			var r,y,m,d;
			y = date.getFullYear();
			m = date.getMonth();
			d = date.getDate();
			m++;
			r = y+'-'+m+'-'+d;
			return r;
		},
		confirmDate:function(){
			this.show = false;
			var a = new Date(this.current.year,this.current.month-1,this.current.date);
			var result = this.outputDate(a);
			this.result = result;
			this.parent[this.child] = result;
			this.callback(result);
		},
		cancel:function(){
			this.init();
			this.show = false;
		}
	},
	watch:{
		'show':function(newVal,oldVal){
			if(newVal && this.parent[this.child]){
				this.render(this.parent[this.child]);
			}
		}
	}
}