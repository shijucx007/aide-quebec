const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
        'libs': ['./assets/js/libs.js'],
        'main': ['./assets/js/main.js'],
        'dashboard': ['./assets/js/dashboard.js']
  },
  resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  watch: true,
  watchOptions: {
      ignored: /node_modules/,
      poll: 1000
  },
  optimization:{
      //do the uglify
     minimizer: [
          new UglifyJsPlugin()
      ]
  },
  module: {
      // Tell webpack to load and compile all sass files, then add the css files and extract them according
      // to the plugins config
      rules: [
          {
              // Enables es6 syntax in .js files
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          },
            {
                test: /\.(s*)[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,

                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        },
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
                ]
            },
            {
                // copy all font files into the dist-production folder
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                exclude: [/images/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        publicPath: '../'
                    }
                }]
            },
            {
                // copy all image files into the dist-production folder
                test: /\.(png|svg|jpg|gif)$/,
                exclude: [/fonts/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                        publicPath: '../'
                    }
                }]
            }
      ],
  },
    optimization:{
       minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    },
  plugins: [
      new MiniCssExtractPlugin({
            //combine .css into one css file
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
      // This cleans the dist folder before each build, so that only used files will be available
      new CleanWebpackPlugin(['dist']),
      new BrowserSyncPlugin({
            proxy: 'scx-ind.irpages2.equitystory/shiju/pages/dashboard-provider/provider-wallet.html'
      })
  ]
};