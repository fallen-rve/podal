const HtmlWebpackPlugin = require('html-webpack-plugin'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/examples/index.html',
    filename: 'index.html',
    inject: 'body'
});
const production = process.env.NODE_ENV === "build";

var config = {
    entry: {
        'podal': __dirname + '/src/js/podal.js',
        'podal.jquery': __dirname + '/src/js/podal.jquery.js'
    },
    output: {
        path: __dirname,
        filename:  production ? './dist/[name].js' : './src/js/[name].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [HtmlWebpackPluginConfig, new LiveReloadPlugin()]
};

if (process.env.NODE_ENV === "build") {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    );
}
module.exports = config;
