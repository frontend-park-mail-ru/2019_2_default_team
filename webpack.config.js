const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: './src/js/application.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".js", ".css"]
    },
    plugins: [
        new HtmlWebpackPlugin({inject: true, template: 'src/index.html'}),
        new MiniCssExtractPlugin({
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.style.[name]-[hash].css',
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, 'src/js/sw.js'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
            },
            {
                // Для включения в css файлов шрифтов и картинок
                test: /\.(jp?g|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.pug/,
                use: 'pug-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    performance: { hints: false },
};
