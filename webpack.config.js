var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/example/index.html',
    filename: 'index.html',
    inject: 'body'
});
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: [
        './src/podal.js'
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
