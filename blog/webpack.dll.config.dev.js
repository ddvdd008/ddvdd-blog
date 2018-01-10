const webpack = require('webpack');

//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = require('./PATHS');
const VENDORS = require('./VENDORS');

module.exports = {
	entry: {
		vendors: VENDORS
	},
	output: {
		path:PATHS.HTML,//打包编译完的文件根目录
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',//按需加载的文件打包编译完路径
		library: '[name]'
	},
	module:{
		rules: [{
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
        }]
    },
	plugins: [
		new webpack.DllPlugin({
			path: '[name]-manifest-dev.json',
			name: '[name]',
			context: __dirname
		}),
		new ExtractTextPlugin({
            filename:'css/[name].css',
            allChunks: true
		}),
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("dev") 
			}
		})
	]
}