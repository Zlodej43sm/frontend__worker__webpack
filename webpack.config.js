const webpack = require('webpack'),
    path = require('path'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    PROJECT_PATH = path.join(__dirname),
    DEST = '/public/compiled',
    NODE_ENV = process.env.NODE_ENV || 'development';

let pathsToClean = PROJECT_PATH + DEST,
    config = {
        context: PROJECT_PATH,
        entry: {
            bundle: './js',
            styles: './stylus'
        },
        output: {
            path: PROJECT_PATH + DEST,
            filename: 'js/[name].js',
            library: "[name]"
        },
        resolve: {
            extensions: ['.js', '.styl', '.css'],
            alias: {
                jquery: `${PROJECT_PATH}/node_modules/jquery/dist/jquery.js`
            }
        },
        watch: NODE_ENV === 'development',
        watchOptions: {
            aggregateTimeout: 100
        },
        devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : "nosources-source-map",
        plugins: [],
        module: {
            rules: []
        }
    };

config.module.rules.push(
    {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
            ignore: '/node_modules/'
        }
    },
    {
        test: /\.jade$/,
        loader: 'jade'
    },
    {
        test: /\.(styl|css)$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        ignore: '/node_modules/',
                        sourceMap: NODE_ENV === 'development'
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: NODE_ENV === 'development'
                    }
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        ignore: '/node_modules/',
                        sourceMap: NODE_ENV === 'development',
                        use: [
                            require('nib')()
                        ]
                    }
                }
            ]
        })
    },
    {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    ignore: '/node_modules/',
                    limit: 10000,
                    publicPath: '..',
                    name: `/[path]${NODE_ENV === 'development' ? '[name]' : '[hash]'}.[ext]`
                }
            }
        ]
    }

);

config.plugins.push(
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
    }),
    // new ImageminPlugin({
    //     test: `${PROJECT_PATH}/i/**`,
    //     jpegtran: {
    //         progressive: true
    //     }
    // }),
    new ExtractTextPlugin('css/[name].css'),
    new CleanWebpackPlugin(pathsToClean),
    new webpack.NoEmitOnErrorsPlugin()
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'common',
    //     minChunks: 3
    // })
);

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin(
            {
                compress: {
                    warnings: false,
                    drop_console: true,
                    unsafe: true
                }
            }
        )
    );
}

module.exports = config;