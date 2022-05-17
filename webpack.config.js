const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'docs')
    },
    devServer: {
        hot: true,
        static: {
            directory: './docs',
            watch: true
        }
    }
};
