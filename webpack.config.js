const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const relpath = path.join.bind(path, __dirname)

const NPM_EVENT = process.env.npm_lifecycle_event
const NODE_ENV = process.env.NODE_ENV || 'development'
const isTestEnv = NODE_ENV === 'test'
const isProductionCode = NODE_ENV === 'production'
const isDevelopmentServer = NPM_EVENT === 'start'
const ASSET_PATH = process.env.ASSET_PATH || '/'

const paths = {
  dist: relpath(`./dist/${NODE_ENV}`),
  appEntry: relpath('./src/app/index'),
  indexHtml: relpath('./src/app/index.html'),
  src: relpath('./src'),
  lib: relpath('./node_modules')
}

module.exports = {
  devtool: getSourceMap(),
  bail: !isDevelopmentServer,
  entry: getEntryPoints(),
  output: {
    path: paths.dist,
    filename: '[name].[hash].bundle.js',
    publicPath: ASSET_PATH
  },
  plugins: getPlugins(),
  resolve: {
    //root: paths.src
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    loaders: [
      /*{
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.s?css/,
        loader: getStyleLoaders(),
        include: paths.src
      },*/
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        }),
        include: paths.src
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          paths.src
        ]
      }, /*{
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        include: paths.src
      },*/ {
        test: /\.yaml$/,
        use: [
          {
            loader: 'yaml-loader'
          }
        ],
        include: paths.src
      },
      {
        test: /\.(png|gif|jpg|jpeg|eot|otf|woff|woff2|ttf|svg)?$/,
        loaders: ['url-loader'],
        include: paths.src
      }
    ]
  }
}

function getSourceMap() {
  // TestEnv source-maps:
  // cheap-module-source-map - fastest that works in the console
  // inline-source-map - works in chrome (for debugging)
  return isTestEnv ? 'inline-source-map' :
    isDevelopmentServer ? 'eval-source-map' :
      'source-map'
}
/*

function getStyleLoaders() {
  const sass = `sass-loader?includePaths[]=${paths.src}&includePaths[]=${paths.lib}`

  return isProductionCode
    ? ExtractTextPlugin.extract('style-loader', ['css-loader?modules&importLoaders=1', 'postcss-loader', sass].join('!')) //
    : ['style-loader?sourceMap', 'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]', 'postcss-loader?sourceMap', `${sass}&sourceMap`].join('!')
}*/

function getEntryPoints() {
  return isDevelopmentServer
    ? [
      'babel-polyfill',
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      paths.appEntry
    ]
    : [
      'babel-polyfill',
      paths.appEntry
    ]
}

function getPlugins() {

  let plugins = [
    new CleanWebpackPlugin(paths.dist),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: `html-loader!${paths.indexHtml}`,
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'ASSET_PATH': JSON.stringify(ASSET_PATH)
      }
    })
  ]

  if (isDevelopmentServer) {
    plugins = plugins.concat([
      new ExtractTextPlugin('[name].[hash].css', { allChunks: true }),
      new webpack.HotModuleReplacementPlugin()
    ])
  }

  if (isProductionCode) {
    plugins = plugins.concat([
      new ExtractTextPlugin('[name].[hash].css', { allChunks: true }),
      //new webpack.optimize.OccurenceOrderPlugin()
      new webpack.optimize.UglifyJsPlugin({
        parallel: true,
        cache: true
        /*compressor: {
          warnings: false
        }*/
      })
    ])
  }

  return plugins
}
