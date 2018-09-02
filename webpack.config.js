const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const outputDirName = process.env.NODE_ENV === 'development' ? 'dist' : 'build'
const devtool = process.env.NODE_ENV === 'development' ? 'source-map' : undefined

const commonPlugins = [
  new CleanWebpackPlugin([outputDirName], { verbose: false }),
  new webpack.DefinePlugin({
    DEBUG_LOGS: !!process.env.DEBUG_LOGS
  }),
  new HtmlWebPackPlugin({
    inject: false,
    chunks: ['options'],
    template: './src/options/options.html',
    filename: './options.html'
  }),
  new HtmlWebPackPlugin({
    inject: false,
    chunks: ['popup'],
    template: './src/popup/popup.html',
    filename: './popup.html'
  }),
  new CopyWebpackPlugin([{
    from: './src/*.json',
    to: './[name].[ext]'
  }]),
  new CopyWebpackPlugin([{
    from: './src/assets/*.*',
    to: './assets/[name].[ext]'
  }]),
  new WriteFilePlugin()
]

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          configFile: path.join(__dirname, '.eslintrc.json'),
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/cache-loader')
          }
        }, {
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 1024
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'cache-loader',
          options: {
            cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/cache-loader')
          }
        }, {
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      background: path.resolve(__dirname, 'src/background/'),
      content: path.resolve(__dirname, 'src/content/'),
      popup: path.resolve(__dirname, 'src/popup/'),
      options: path.resolve(__dirname, 'src/options/'),
      reducers: path.resolve(__dirname, 'src/redux/reducers/'),
      middleware: path.resolve(__dirname, 'src/redux/middleware/'),
      actions: path.resolve(__dirname, 'src/redux/actions/'),
      store: path.resolve(__dirname, 'src/redux/store/'),
      reduxUtils: path.resolve(__dirname, 'src/redux/utils/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      shared: path.resolve(__dirname, 'src/shared/')
    }
  },
  entry: {
    popup: './src/popup/popup.js',
    content: './src/content/content.js',
    options: './src/options/options.js',
    background: './src/background/background.js'
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/${outputDirName}`
  },
  devtool,
  devServer: {
    contentBase: `${__dirname}/${outputDirName}/`,
    inline: true,
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: this.mode === 'production' ? [...commonPlugins, new UglifyJsPlugin({ cache: true })] : commonPlugins
}
