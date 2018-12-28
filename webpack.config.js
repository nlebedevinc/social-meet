const webpack = require('webpack');
const HWP = require('html-webpack-plugin');
const path = require('path');
const sourcemapTool = process.env.WEBPACK_MODE === 'development'
  ? 'eval'
  : '';

module.exports = {
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'static/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'static/[hash].js'
  },
  devtool: sourcemapTool,
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HWP({
      template: path.join(__dirname, '/src/client/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
