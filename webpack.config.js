const path = require("path");
const webpack = require("webpack");

const serverConfig = {
	mode: process.env.NODE_ENV,
	target: "node",
	entry: path.join(__dirname, "src", "server"),
	watch: process.env.NODE_ENV === "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "api"),
	},
};

const clientConfig = {
	mode: process.env.NODE_ENV,
	target: "web",
	entry: path.join(__dirname, "src", "client"),
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			SSR: process.env.SSR,
		}),
	],
	output: {
		filename: "app.js",
		path: path.resolve(__dirname, "public", "dist"),
	},
};

module.exports = [serverConfig, clientConfig];
