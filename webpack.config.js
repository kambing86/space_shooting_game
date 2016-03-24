const webpack = require('webpack');
// const ClosureCompilerPlugin = require('webpack-closure-compiler');
module.exports = {
  entry: __dirname + "/src/app.js",
  output: {
    path: __dirname + "/bin/",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        test: /\.html$/,
        loader: "html"
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.(gif|png|jpe?g|svg|eot|woff|ttf)$/,
        loader: "file?name=../[path][name].[ext]"
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
      // {
      //   test: /.*\.(gif|png|jpe?g|svg)$/i,
      //   loaders: [
      //     'file?hash=sha512&digest=hex&name=[hash].[ext]',
      //     'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      //   ]
      // }
    ]
  },
  externals: {
    "$": "$",
    "Howl": "Howl",
    "PIXI": "PIXI"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": "$",
      "Howl": "Howl",
      "PIXI": "PIXI"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    // new ClosureCompilerPlugin({
    //   compiler: {
    //     language_in: 'ECMASCRIPT6',
    //     language_out: 'ECMASCRIPT5',
    //     compilation_level: 'SIMPLE',
    //     create_source_map: __dirname + "/bin/bundle.js.map"
    //   },
    //   concurrency: 3
    // })
  ]
};
