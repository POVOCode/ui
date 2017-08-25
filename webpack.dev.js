module.exports = {
  devtool: "cheap-module-source-map",

  entry: [
    "webpack-dev-server/client?http://localhost:9999",
    "webpack/hot/only-dev-server",
    "./src/index.js",
    "./src/index.html"
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
        "file-loader?name=[path][name].[ext]"
      ]
    }]
  },

  resolve: {
    extensions: ["*", ".js"]
  },

  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "pv.bundle.js",
    sourceMapFilename: "pv.map",
  },

  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 9999,

    historyApiFallback: {
      index: "index.html"
    }
  }
};
