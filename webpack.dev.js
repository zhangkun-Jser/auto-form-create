const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: path.join(__dirname, 'examples', 'index.js'),
    },
    output: {
        path: path.join(__dirname, 'examples/dist'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: 'dist/',
    },
    resolve: {
        extensions: ['.js', '.jsx', ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.md$/,
                use: [
                    'raw-loader',
                ],
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {minimize: true, },
                    },
                ],
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'examples'),
        host: '0.0.0.0',
        inline: true,
        hot: true,
        // historyApiFallback: true,
        proxy: {
            '*.do': {
                bypass: function (req){
                    console.log(req.url); // eslint-disable-line no-console
                    if(req.url.indexOf('.do') !== -1){
                        req.method = 'GET';
                        return '/mock' + req.url.replace('.do', '.json');
                    }
                },
            },
        },
    },
};
