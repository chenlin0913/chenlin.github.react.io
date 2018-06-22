const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	entry: ['babel-polyfill', './src/index.js'], //项目的起点入口
	output: { //项目输出配置
		path: path.resolve(__dirname, 'build'), //文件的输出目录 
		publicPath:'',
		filename: 'static/js/[name].[hash:5].js',
		chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': resolve('src')
		}
	},
	module: { //模块加载
		rules: [{
			test: /\.css$/, //匹配规则
			use: [{
					loader: "style-loader"
				},
				{
					loader: "css-loader"
				}
			]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			},

		}, {
			test: /\.(png|svg|jpg|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 8192, //小于8192B的文件转为base64文件
					name: 'static/images/[name].[hash:5].[ext]'
				}
			}
		}]
	},
	plugins: [ //插件配置
		new CleanWebpackPlugin(['build']), //清空编译输出文件夹
		//生成Html5文件
		new HtmlWebpackPlugin({
			title: 'React Demo',
			filename: 'index.html',
			template: path.resolve(__dirname, 'templates', 'index.html')
		}),
		//定义全局属性
		new webpack.ProvidePlugin({
	        PropTypes:'prop-types',
	        React:'react',
	        ReactDom:'react-dom',
	        axios:'axios'
    	}),
    	// 热更新替换
    	new webpack.HotModuleReplacementPlugin(),
    	new CopyWebpackPlugin([
    		{
	            from: 'static/images',
	            to: 'static/images'
        	}
    	],{
            ignore: [],
            copyUnmodified: true,
            debug: "debug"
        })
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "common",
					chunks: "initial",
					minChunks: 2
				}
			}
		}
	}
}