const path = require('path'),
    PROJECT_PATH = path.join(__dirname, '/example'),
    STYLES_SRC = './css/stylus',
    STYLES_DEST = './css/compiled',
    SCRIPTS_SRC = './js/source',
    SCRIPTS_DEST = '/js/compiled',
    NODE_ENV = process.env.NODE_ENV || 'development';

let webpack = require('webpack'),
    config = {
        context: PROJECT_PATH,
        entry: {
            Masonry: `${SCRIPTS_SRC}/Masonry`
        },
        output: {
            path: PROJECT_PATH + SCRIPTS_DEST,
            filename: "[name].js",
            library: "[name]"
        },
        // watch: NODE_ENV === 'development',
        watchOptions: {
            aggregateTimeout: 100
        },
        devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : "nosources-source-map",
        plugins: [],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader'
                }
            ]
        }
    };

config.plugins.push(
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