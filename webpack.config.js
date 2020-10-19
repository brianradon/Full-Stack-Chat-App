const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./scripts/Main.jsx",
    output: {
        path: __dirname,
        filename: "./static/script.js"
    },
    module: {
        rules: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                     presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                              targets: {
                                esmodules: false
                              }
                            }
                        ]
                    ]
                }
            }, 
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
              },
              {test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' }]
    },
    resolve: {
    extensions: ['.js', '.jsx'],
  },
};