const path = require('path')
const nodeExternals = require('webpack-node-externals')

const config = {
    entry: './index.ts',
    target: 'node',
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    externals: [nodeExternals()],
};

module.exports = config;
