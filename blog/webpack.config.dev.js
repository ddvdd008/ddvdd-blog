
/*单页面webpack+react页面配置*/
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
const HtmlwebpackPlugin = require('html-webpack-plugin');
//本地启动服务控制浏览器打开页面路径
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PATHS = require('./PATHS');

let devConfig = merge(webpackBaseConfig, {
	output:{
        path:PATHS.DIST,//打包编译完的文件根目录
        filename: "js/[name].js",//打包编译完文件路径和名称
		chunkFilename: 'js/[name].chunk.js',//按需加载的文件打包编译完路径
		publicPath: 'http://localhost:8080/dist/',
	},
	//启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
	devtool:'eval-source-map',
	devServer:{
        contentBase: PATHS.DIST,
        port:8080,
        hot:true,
        noInfo:true,
        inline:true,
        compress:true
		// proxy:{
		// 	'/api/*':{
		// 		target:'http://localhost:8080',
		// 		secure:false
		// 	}
		// }
	},
    plugins: [
        new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors'),
	    new HtmlwebpackPlugin({
	      title: 'ddvdd-blog',
	      template: PATHS.HTML.join('index.html'),
	      //filename: 'index.html',
	      //chunks: ['vendors','app'],
	      inject: true
        }),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //     NODE_ENV: JSON.stringify("dev")
        //     }
        // }),   
        new OpenBrowserPlugin({ url: 'http://localhost:8080/dist/' })
	  ]
});

module.exports = devConfig;
