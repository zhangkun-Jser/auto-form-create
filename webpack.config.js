const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, 'dist/build-index'),
    },
    output: {
        path: path.join(__dirname, 'dist'),
        library: 'bizAutoForm',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'biz-auto-form.min.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: { react: 'React' },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: [{ loader: 'css-loader', options: { minimize: true } }, { loader: 'less-loader' }],
                }),
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
        new ExtractTextPlugin('biz-auto-form.min.css'),
    ],
};
