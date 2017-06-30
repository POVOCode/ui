const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "./src/index.js"
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "react-hot-loader!babel-loader"
    }, {
      test: /\.styl$/,
      exclude: /node_modules/,
      loader: "style-loader!css-loader!stylus-loader"
    }, {
      test: /\.html$/,
      use: [
        "file-loader?name=[name].[ext]"
      ]
    }]
  },

  resolve: {
    extensions: ["*", ".js"]
  },

  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "pv.bundle.[chunkhash].js",
    sourceMapFilename: "pv.map",
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: "POVO",
      template: "src/index.ejs",
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
};
