const NODE_ENV = process.env.NODE_ENV || 'development',
    PROJECT_PATH = './example',
    STYLES_SRC = `${PROJECT_PATH}/css/stylus`,
    STYLES_DEST = `${PROJECT_PATH}/css/compiled`,
    SCRIPTS_SRC = `${PROJECT_PATH}/js/source`,
    SCRIPTS_DEST = `${PROJECT_PATH}/js/compiled`;

let webpack = require('webpack'),
    config = {
        entry: `${SCRIPTS_SRC}/Masonry.js`,
        output: {
            filename: `${SCRIPTS_DEST}/Masonry.js`,
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

module.exports = config;

if (NODE_ENV === 'production') {
    module.exports.plugins.push(
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