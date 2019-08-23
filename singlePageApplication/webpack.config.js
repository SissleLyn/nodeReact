var path = require("path");
var webpack = require('webpack');
module.exports = {
    entry: { app: ['./app/main.jsx'] },
    output: {
        path: path.resolve(__dirname, "./build"),
        publicPath: "http://127.0.0.1:8080/build/",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devServer: { 
        host: '127.0.0.1',
        openPage:"./build/index.html",//配置打开界面
        historyApiFallback: true,//配置属性是用来应对返回404页面时定向到特定页面用的
        hot: true,//hot自动刷新和inline模块热替换机制
        inline: true,
        progress: true,
        open:true,//open选项被设置为true时，dev server将直接打开浏览器
        stats: "errors-only" //在shell中只输出errors
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};