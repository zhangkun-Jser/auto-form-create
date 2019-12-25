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
        extensions: ['.js', '.jsx'],
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
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            {
                test: /\.css/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.less/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
};
