/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
var BrotliPlugin = require('brotli-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var fs = require('fs');

module.exports = {
  mode: 'production',

  devtool: '',

  entry: [
    './client/index.js',
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: "bundle.[hash].js",
    path: __dirname + '/dist/bundle/',
    publicPath: '/static/'
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      })
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
      'process.env': {
        'NODE_ENV': '"production"'
      },
    }),

    new MiniCssExtractPlugin({
      filename: "bundle.[hash].css",
    }),

    new webpack.optimize.AggressiveMergingPlugin(),

    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7
    }),

    function () {
      this.plugin("done", function (stats) {

        var replaceInFile = function (filePath, toReplace, replacement) {

          var str = fs.readFileSync(filePath, 'utf8');

          var regex = /(?<=bundle.).+/;

          var r = str.match(regex);

          var out = str.replace(r[0], (replacement + "';"));

          fs.writeFileSync(filePath, out);
        };

        replaceInFile(path.join(__dirname, 'routes/index.js'),
          'md5Hash', stats.hash
        );
      });
    },

    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}