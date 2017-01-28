const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const production = process.env.NODE_ENV === 'build';

var config = {
    resolve: {
        extensions: [
            '',
            '.js',
            '.scss'
        ]
    },
    entry: {
        'podal': __dirname + '/src/js/podal.js',
        'podal.jquery': __dirname + '/src/js/podal.jquery.js'
    },
    output: {
        path: __dirname,
        filename:  production ? './dist/[name].min.js' : './src/js/[name].js',
        library: 'podal'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    plugins: [new ExtractTextPlugin("podal.css")]
};

if (production) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    );
}
module.exports = config;
