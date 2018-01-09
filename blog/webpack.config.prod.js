const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      
const PATHS   = require('./PATHS');
//配置
var prodConfig = merge(webpackBaseConfig, {
    output: {
        path: PATHS.DIST,    //文件路径
        publicPath: '/dist/',                  // 资源路径
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new HtmlwebpackPlugin({
            title: 'ddvdd-blog',
            template: PATHS.HTML.join('index.html'),
            filename: 'index.html',
            chunks: ['vendors','app'],
            inject: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.js',
            warn:false
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
    ]
});

module.exports = prodConfig;

