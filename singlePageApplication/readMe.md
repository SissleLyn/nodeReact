#下载安装node
官网中直接搜索下载安装即可；
node -v 确认是否安装成功
npm -v 确认npm（node 的包管理工具）是否存在
##更新npm至最新版
npm install -g npm@latest

1. 安装 nodejs ：根据你的 Windows 类型(x86或x64)下载相应的安装包进行安装。安装完成后，可以在任一目录下打开 cmd 窗口并运行 node -v 命令，如果显示 node 的版本信息则表示安装成功。

    --注：在 windows 操作系统中，如果把 nodejs 安装在系统盘（如：C盘），初始化时会提示 nodejs 没有操作文件的权限（无法新建 package.json 文件）。

   （建议在非系统盘中安装 nodejs ，本例安装路径：D:\Program Files）

2. 初始化 npm：安装 nodejs 时会默认安装 npm，可以在 cmd 窗口中运行 npm -v 命令来查看 npm 包的版本信息。

    接着运行 npm init 命令，并设置相关参数即完成 npm 的初始化。这时 nodejs 会在当前目录下（这里是：D:\Program Files\nodejs 目录）新建一个 package.json 的配置文件，里面将会存储当前程序所引用的 js 组件（包）的版本信息。    

3. 利用 npm 安装 react 相关的包：  

  3.1 运行 npm install react react-dom --save-dev 命令来安装 react 和 react-dom 包。  

       其中 --save-dev 表示在 package.json 文件的 devDependencies 节点下添加包的引用，--save 表示在 package.json 文件的 dependencies 节点下添加包的引用

  3.1 运行 npm install webpack webpack-dev-server --save-dev 命令，安装 webpack 和 webpack-dev-server 包。

        webpack 用来打包并压缩 js 文件，webpack-dev-server 用来实时同步修改过的 js，html，css 文件到浏览器页面。

  3.5 运行 npm install jsx-loader --save-dev 命令，安装 jsx-loader 包（它可以把按 ES5 规范编写的 .jsx 文件转成一般的 .js 文件）。

       如果需要支持符合 ES6 规范的脚本文件（.js 或 .jsx），还需安装下面 4 个包：babel-core babel-loader babel-preset-es2015 babel-preset-react。

       如果需要用到路由，还需安装：react-router。

配置 Webpack：

1. Webpack 使用一个名为 webpack.config.js 的配置文件，可以手动添加一个 webpack.config.js 文件到 nodejs 根目录下，并按如下方式添加相关节点：
`
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
`
resolve 指定可以被 require 的文件后缀。比如 Hello.jsx 这样的文件就可以直接用 require(./Hello) 引用。

rules 指定 jsx-loader 编译后缀名为 .jsx 的文件，建议给含有 JSX 的文件添加 .jsx 后缀，当然你也可以直接使用 .js 后缀， 相应的 test 节点下的正则表达式也要修改。

Webpack 内置支持 CommonJS，所以可以直接用 npm 下载安装模块，然后直接 require 使用模块。

    安装 React: npm install react --save
    使用 React: var React = require('react');

2. 修改 package.json 文件中的 scripts 节点为：
  `
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --inline"
  }
  `

添加项目文件：
  1. 添加 app/main.jsx，build/index.html

build/index.html中引用 
`
<script src= host +"/build/bundle.js"></script>
`
编译与运行：

在 cmd 窗口中运行 npm run start 命令
