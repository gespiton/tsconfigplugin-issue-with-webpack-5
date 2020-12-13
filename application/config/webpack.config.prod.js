const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')

const config = ({
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: [path.resolve(__dirname,'../src/index.tsx')],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[chunkhash:8].min.js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.min.js',
    publicPath: '/',
    globalObject: 'this',
  },
  optimization: {
    minimize: false,
    splitChunks: {
      // do not split chunks for easier debugging
      minChunks: 99999999999,
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
    alias: {
      // 'fullscreen': 'fullscreen/src',
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname,'../tsconfig.json'),
        logLevel: 'info',
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          }
        ]
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, message, ...args) => {
     console.log(`${(percentage * 100).toFixed(2)}%`, message, ...args);
    }),
   new HtmlWebpackPlugin({
      inject: true,
      title: 'title',
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: ['main'],
    }),
  ],
});

module.exports = config;
