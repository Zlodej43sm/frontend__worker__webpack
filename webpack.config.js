const webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    PROJECT_PATH = path.join(__dirname, 'example'),
    DEST = '/compiled',
    NODE_ENV = process.env.NODE_ENV || 'development';

let pathsToClean = PROJECT_PATH + DEST,
    config = {
        context: PROJECT_PATH,
        entry: {
            Masonry: './masonry',
            styles: './styles/stylus'
        },
        output: {
            path: PROJECT_PATH + DEST,
            filename: "js/[name].js",
            library: "[name]"
        },
        resolve: {
            extensions: ['.js', '.styl', '.css']
        },
        // watch: NODE_ENV === 'development',
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
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
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
                        sourceMap: NODE_ENV === 'development'
                    }
                }
            ]
        })
    },
    {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name (file) {
                        if (NODE_ENV === 'development') {
                            return '[path][name].[ext]'
                        }

                        return '[hash].[ext]'
                    }
                }
            }
        ]
    }

);

config.plugins.push(
    new ExtractTextPlugin('css/[name].css'),
    new CleanWebpackPlugin(pathsToClean),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 3
    })
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