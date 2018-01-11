const webpack = require('webpack');

//把css样式从打包文件里面分离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//自动帮你生成一个 html 文件，并且引用相关的 assets 文件(如 css, js)。
const HtmlwebpackPlugin = require('html-webpack-plugin');
const PATHS = require('./PATHS');
const VENDORS = require('./VENDORS');

module.exports = {
	entry: {
		vendors: VENDORS
	},
	output: {
		path: PATHS.DIST,
		filename:"js/[name]-[chunkhash:8]-dll.js",//打包编译完文件路径和名称
		library: '[name]_[chunkhash:8]'
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
		new ExtractTextPlugin({
            filename:'css/[name]-[contenthash:8]-dll.css',
            allChunks: true
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
		new webpack.DefinePlugin({
			"process.env": { 
				NODE_ENV: JSON.stringify("production") 
			}
        }),
        new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
        }),
         //webpack3.0以上
         new webpack.optimize.ModuleConcatenationPlugin(),
         new webpack.DllPlugin({
			path: '[name]-manifest.json',
			name: '[name]_[chunkhash:8]',
			context: __dirname
		})
	]
}