const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(config, {
	devtool: 'inline-source-map', //代码关联显示方式
	devServer: {
		historyApiFallback: true, //文件重定向，和react-router相关
		hot: true, //开启模块热替换
		port: 8280, //服务器端口
		host: "localhost", //服务器域名
		open: true, //自动打开浏览器标签
		proxy:{
            '/api': {
                target: 'http://10.38.39.202:9080/mmalltest/',
                secure:false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/wsapi':{
            	target: 'ws://10.38.39.202:9080/mmalltest/websocket',
                secure:false,
                changeOrigin: true,
                pathRewrite: {
                    '^/wsapi': ''
                }
            }
        }
	},
	plugins: [
		new webpack.NamedModulesPlugin(), //显示模块的相对路径
		new webpack.HotModuleReplacementPlugin(), //加载热替换插件
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': 'development'
		})
	]
});