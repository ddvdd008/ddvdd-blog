//webpack-base
/*单页面webpack+react页面配置*/
const path = require('path');
const webpack = require('webpack');
//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = require('./PATHS');
const VENDORS = require('./VENDORS');
let baseConfig = {
	entry:{
        vendors:VENDORS,
		app:PATHS.APP.join('index.js')
	},
	output:{
        path:PATHS.DIST,//打包编译完的文件根目录
        filename: "js/[name].js",//打包编译完文件路径和名称
		chunkFilename: 'js/[name].chunk.js',//按需加载的文件打包编译完路径
	},
	module:{
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=40000'
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: 'css-loader?sourceMap'
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader?sourceMap', 'sass-loader?sourceMap']
			})
        },
        //按照entry入口，对各种图片进行提取打包
        {
            test: /\.(gif|jpg|png)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'img/[name].[ext]?[hash]'
                }
            }
        }, 
        //按照entry入口，对字体设置等文件进行提取打包
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'fonts/[name].[ext]?[hash]'
                }
            }
        }]
    },
    resolve: {
        modules: ['node_modules', "assets"],
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.jsx', '.json'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            ROOT: PATHS.ROOT,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.ASSETS,
            COMPONENTS: PATHS.APP.join('components')
        }
    }
};
module.exports = baseConfig;
