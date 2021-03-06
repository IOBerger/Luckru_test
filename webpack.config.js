const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.tsx',
    },
    context: path.resolve(__dirname, "static_src"),
    output: {
        path: path.resolve(__dirname, "static", "build"),
        filename: 'app.js',
        publicPath: 'static/build/',
    },

    module: {
        rules: [{
                test: /\.tsx$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            },
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        modules: [`${__dirname}/static_src`, 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    //watch: true
};