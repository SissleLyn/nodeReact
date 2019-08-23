var path = require("path");
var webpack = require('webpack');
export default {
  entry: [
    path.resolve(__dirname, 'src/js/index.js')
  ],
  output: {
    path: `${__dirname}/src`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.jsx', '.json'],

    // 路径别名, 懒癌福音
    alias: {
      app: path.resolve(__dirname, 'src/js'),
      // 以前你可能这样引用 import { Nav } from '../../components'
      // 现在你可以这样引用 import { Nav } from 'app/components'

      style: path.resolve(__dirname, 'src/styles'),
      // 以前你可能这样引用 import "../../../styles/mixins.scss"
      // 现在你可以这样引用 import "style/mixins.scss"

      images: path.resolve(__dirname, 'src/static/images')


      // 注意：别名只能在.js文件中使用。
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/js'),
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss?parser=postcss-scss'
        ]
      },
      // 组件样式，需要私有化，单独配置

      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/styles'),
        loader: 'style!css!postcss?parser=postcss-scss'
      },
      // 公有样式，不需要私有化，单独配置

      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules'),
        loader: 'style!css!postcss'
      },

      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'url?limit=10000'
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    openPage: "./build/index.html",//配置打开界面
    historyApiFallback: true,//配置属性是用来应对返回404页面时定向到特定页面用的
    hot: true,//hot自动刷新和inline模块热替换机制
    inline: true,
    progress: true,
    open: true,//open选项被设置为true时，dev server将直接打开浏览器
    stats: "errors-only" //在shell中只输出errors
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE.ENV': "development"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};