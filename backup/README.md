# Vue-DatePicker
## Intro
A date picker for [Vuejs](https://github.com/vuejs/vue/ "Vue"), it's still in developing.

## Usage
HTML:

```html
<input v-model="your-model" type="text" readonly v-datepicker='model'>
<datepicker v-ref:datepicker></datepicker>
<script src="path/to/vue-datepicker.js"></script>
<script type="text/javascript">
    Vue.use(DatePicker, {
      event: 'focus', //use event which you want to trigger datepicker
      callback: function(result, expression, el) {
        // do what you like in this callback function, result,expression and element will be provided
        console.log(el);
        console.log(expression);
        console.log(result); //this function will be triggered after you click confirm in date picker
      }
    });
    var app = new Vue({
      el:"your-el",
      data:{
          date:'2016-2-9'
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
- Make it as a Plug-in of Vue **[Done]**
- Rewirte style with Bootstrap **[Maybe**]
- Make it Responsive **[Maybe]**
- Time Picker **[Maybe]**
