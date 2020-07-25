const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "production",
    target: 'node',
    externals: [nodeExternals()],

    entry: './app/javascript/master.js',
    output: {
        filename: "master-bundle.js",
        path: path.join(__dirname + "/app/dist/")
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader']
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: url => '../assets/' + url
                }
            }
        ],
    },
}