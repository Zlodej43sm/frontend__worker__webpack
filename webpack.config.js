const NODE_ENV = process.env.NODE_ENV || 'development',
    PROJECT_PATH = './fe_stylus',
    STYLES_SRC = `${PROJECT_PATH}/css/stylus`,
    STYLES_DEST = `${PROJECT_PATH}/css/compiled`,
    SCRIPTS_SRC = `${PROJECT_PATH}/js/source`,
    SCRIPTS_DEST = `${PROJECT_PATH}/js/compiled`;

let path = require('path'),
    webpack = require('webpack'),
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
        devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : null,
        plugins: [
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV),
                USER: JSON.stringify(process.env.USER)
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,

                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                }
            ]
        }
    };

module.exports = config;