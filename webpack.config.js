const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename:"[name][hash].js"
	},
	resolve: {
		alias: {
			"$": "jquery"	
		},
		extensions: [".js",".css"]
	},
	module: {
		rules:[
			{ test: /\.js$/, loader: "babel-loader"},
			{ test: /\.css$/, use: ["style-loader", "css-loader"]},
			{ test: /\.(png|jpg|gif)$/, loader: "file-loader"}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "index.html")
		}),
		new CopyWebpackPlugin([{
				from: "node_modules/fullcalendar/dist/fullcalendar.css",
				to: "css/"
			},
			{
				from: "node_modules/fullcalendar-scheduler/dist/scheduler.css",
				to: "css"
			}
		]),
		new HtmlWebpackIncludeAssetsPlugin({
			assets:["/css/fullcalendar.css","/css/scheduler.css"],
			append: false
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		headers: {
			"X-Content-Type-Options":"nosniff"
		},
		port: 8200,
		open: true,
		proxy: {
			"/api/": {
				target: "http://google.com",
				secure: false
			}
		}
	}	
}