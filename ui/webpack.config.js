const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const config = {
    entry: {
        'vendor': './src/vendor',
        'app': './src/main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.es6', '.js', '.json']
    },
    module: {
        preLoaders: [
            {test: /\.ts$/, exclude: /node_modules/, loader: 'tslint'}
        ],
        loaders: [
            {test: /\.ts$/, exclude: /node_modules/, loaders: ['ts', 'angular2-template-loader']},
            {test: /\.json$/, loader: 'json'},
            {test: /\.html/, loader: 'html'},
            {test: /\.scss$/, loaders: ['raw', 'sass']},
            {test: /\.css$/, loader: 'raw'},
            {test: /\.(gif|png|jpe?g)$/i, loader: 'file?name=dist/images/[name].[ext]'},
            {test: /\.woff2?$/, loader: 'url?name=dist/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'},
            {test: /\.(ttf|eot|svg)$/, loader: 'file?name=dist/fonts/[name].[ext]'}
        ]
    }
};

if (!(process.env.WEBPACK_ENV === 'production')) {
    config.devtool = 'source-map';
    config.plugins = [
        new webpack.DefinePlugin({
            'WEBPACK_ENV': '"dev"'
        })
    ]
} else {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'WEBPACK_ENV': '"production"'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new CopyWebpackPlugin([{from: './src/index.html'}], {})
    ];
}

module.exports = config;
