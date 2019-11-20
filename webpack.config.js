const path = require('path');

module.exports = {
    entry: './src/js/application.js',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'application.js',
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".js"]
    },
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
    performance: { hints: false },
};