module.exports = {
    entry: "./src/datepicker.js",
    output: {
        path: './',
        filename: "vue-datepicker.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: "style!css" }   
        ]
    }
};