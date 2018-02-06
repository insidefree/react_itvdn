const webpack = require('webpack')
const path = require('path')
const outputPath = path.resolve(__dirname, './dist')
const HTMLWebpackPlugin = require('html-webpack-plugin')


const webpackConfig = {
    entry: {
        app: [
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /.\scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpeg|jpg|svg)&/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src/assets/'),
                use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            path: outputPath,
            favicon: 'src/assets/images/favicon.ico'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),
        port: 8080,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0'
    }
}

module.exports = webpackConfig