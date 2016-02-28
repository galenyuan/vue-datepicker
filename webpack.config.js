module.exports = {
    entry: "./main.js",
    output: {
        path: './build',
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: "style!css" }   
        ]
    }
};