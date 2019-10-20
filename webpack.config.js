const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // What this means is for any file that has filename matching with the regular expression specified in the testproperty, 
            // first use 'sass-loader' and ‘css-loader’ to compile those and then use ‘style-loader’ on the output of css-loader and sass-loader.
            // ***Note*** the order in which webpack applies loaders on the matching resources is from last to first.’
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        url: true
                    }
                }]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", "*"]
    }
};


