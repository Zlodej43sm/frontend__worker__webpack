const PROJECT_PATH = './example',
    STYLES_SRC = '/css/stylus',
    STYLES_DEST = '/css/compiled',
    SCRIPTS_SRC = '/js/source',
    SCRIPTS_DEST = '/js/compiled',
    NODE_ENV = process.env.NODE_ENV || 'development';

let webpack = require('webpack'),
    config = {
        entry: `${PROJECT_PATH}${SCRIPTS_SRC}/Masonry.js`,
        output: {
            filename: `${PROJECT_PATH}${SCRIPTS_DEST}/Masonry.js`,
            library: "Masonry"
        },
        watch: NODE_ENV === 'development',
        watchOptions: {
            aggregateTimeout: 100
        },
        devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : "nosources-source-map",
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV)
            })
        ],
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