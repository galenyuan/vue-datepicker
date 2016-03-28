# Vue-DatePicker
## Intro
A date picker for [Vuejs](https://github.com/vuejs/vue/ "Vue"), it's still in developing.

## Usage
HTML:

```html
<input v-model="your-model" type="text" readonly v-on:focus="showCalendar($event,parent,'child')">
```

parent should be a **variable** and child should be a **string**, so that **parent[child]** can read your property.

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

## Progress
- Show Year & Month & Date **[Done]**
- Prev Month & Next Month **[Done]**
- Date Checker **[Done]**
- Save result to model **[Done]**
- Month Panel & Year Panel **[Done]**
- Build with Webpack **[Done]**
- Make it as a Plug-in of Vue **[In Progress]**
- Rewirte style with Bootstrap **[Maybe**]
- Make it Responsive **[Maybe]**
- Time Picker **[Maybe]**
