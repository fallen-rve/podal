var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/examples/index.html',
    filename: 'index.html',
    inject: 'body'
});
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: [
        './src/js/podal.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'podal.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    plugins: [HtmlWebpackPluginConfig, new LiveReloadPlugin()]
};
