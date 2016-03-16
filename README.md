# Vue-DatePicker
##Intro
A date picker for [Vuejs](https://github.com/vuejs/vue/ "Vue"), it's still in developing.
##Usage
HTML:
```html
<input v-model="your-model" type="text" readonly v-on:focus="showCalendar($event,parent,'child')">
```
parent should be a __variable__ and child should be a __string__, so that __parent[child]__ can read your property.

```html
<datepicker v-ref:datepicker></datepicker>
<script src="path/to/vue-datepicker.js"></script>
<script type="text/javascript">
	var app = new Vue({
		el:"your-el",
		data:{
			date:'2016-2-9'
		},
		methods:{
			showCalendar:function(e,parent,child){
				var vm = this;
				vm.$refs.datepicker.parent = parent;
				vm.$refs.datepicker.child = child;
				vm.$refs.datepicker.show = true;
				vm.$refs.datepicker.x = e.target.offsetLeft;
				vm.$refs.datepicker.y = e.target.offsetTop + e.target.offsetHeight + 10;
				vm.$refs.datepicker.callback = function(result) {
					console.log(result);
				}
			}
		}
	});
</script>
```
You can also see demo in [here](https://github.com/galenyuan/vue-datepicker/tree/master/demo "Demo")
##Progress
- Show Year & Month & Date __[Done]__
- Prev Month & Next Month __[Done]__
- Date Checker __[Done]__
- Save result to model __[Done]__
- Month Panel & Year Panel __[In Progress]__
- Build with Webpack __[Done]__
- Make it as a Plug-in of Vue __[In Progress]__
- Rewirte style with Bootstrap __[Maybe__]
- Make it Responsive __[Maybe]__
- Time Picker __[Maybe]__
