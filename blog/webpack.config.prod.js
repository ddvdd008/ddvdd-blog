const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
const HtmlwebpackPlugin = require('html-webpack-plugin');
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//css和js文件hash值解耦
const WebpackMd5Hash = require('webpack-md5-hash');
const PATHS   = require('./PATHS');
//配置
let prodConfig = merge(webpackBaseConfig, {
    output: {
        path: PATHS.DIST,    //文件路径
        filename:"js/[name]-[chunkhash:8].js",//打包编译完文件路径和名称
        chunkFilename: 'js/name]-[chunkhash:8].js',//按需加载的文件打包编译完路径
        publicPath: '/dist/',                  // 资源路径
    },
    devtool:false,
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name]-[contenthash:8].css',
            allChunks: true
        }),
        new HtmlwebpackPlugin({
            title: 'ddvdd-blog',
            template: PATHS.HTML.join('index.html'),
            filename: 'index.html',
            chunks: ['vendors','app'],
            //hash:true,
            inject: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'js/[name]-[chunkhash:8].js',
        //     warn:false
        // }),
        new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),
        new OptimizeCssAssetsPlugin({
			// assetNameRegExp: /.css$/g,
			// cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
        }),
        new WebpackMd5Hash("webpack-md5-hash"),
        new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
        }),
        //webpack3.0以上
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./vendors-manifest.json')
		})
    ]
});

module.exports = prodConfig;

