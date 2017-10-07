module.exports = ctx => {
    const NODE_ENV = ctx.env || 'development';

    let plugins = {
        'postcss-import': {},
        'postcss-cssnext': {}
    };

    if (NODE_ENV === 'production') {
        plugins.cssnano = {
            autoprefixer: false
        };
    }

    return {
        parser: false,
        plugins: plugins
    }
};