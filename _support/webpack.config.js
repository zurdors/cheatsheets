const join = require('path').resolve
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  context: join(__dirname, '..'),
  entry: {
    app: './_js/app.js'
  },
  output: {
    path: join(__dirname, '..', 'assets', 'packed'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  stats: 'minimal',
  plugins: [
    // Don't include debug symbols ever
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    // Always minify, even in development.
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: true,
        mangle: true
      }
    })
  ]
}
