const gulp = require("gulp");
const gutil = require("gulp-util");
// const connect = require("gulp-connect");
const exec = require("child_process").exec;
const webPath = "/";
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const myDevConfig = Object.create(webpackConfig);
const inquirer = require("inquirer");

myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;
// gulp.task('connect', function() {
//   connect.server({
//     port: 8080,
//     livereload: true
//   });
// });
// gulp.task('html', function () {
//   gulp.src('./*.html')
//     .pipe(connect.reload());
// });
// gulp.task('watch', function() {
//   gulp.watch(['./*.html'], ['html']);
// });
// gulp.task("default", ['connect', 'watch'], function() {
//   var isWin = /^win/.test(process.platform);
//   if (isWin) {
//     exec("start chrome http://localhost:8080" + webPath);
//   } else if (process.platform === "darwin") {
//     exec("/usr/bin/open -a '/Applications/Google Chrome.app' 'http://localhost:8080" + webPath + "'");
//   }
// });
gulp.task("build", function(callback) {
  webpack(myDevConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("build", err);
    gutil.log("build", stats.toString({
      colors: true
    }));
    callback();
  });
});
gulp.task("default", ["build"], function() {
  const WebpackDevServer = require("webpack-dev-server");
  gulp.watch(["src/**/*", "css/**/*"], ["build"]);
  // myDevConfig.entry = "webpack-dev-server/client?http://localhost:8080" + myDevConfig.entry;
  var compiler = webpack(myDevConfig);
  new WebpackDevServer(compiler, {
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
    if (err) throw new gutil.PluginError("[webpack-dev-server]", err);
    var serverUrl = "http://localhost:8080" + webPath;
    // var serverUrl = "http://localhost:8080/";
    gutil.log("[webpack-dev-server]", serverUrl);
    var isWin = /^win/.test(process.platform);
    if (isWin)
      exec("start chrome " + serverUrl);
    else if (process.platform === "darwin")
      exec("/usr/bin/open -a '/Applications/Google Chrome.app' " + serverUrl);
  });
});
gulp.task("spritesheet", function(callback) {
  inquirer.prompt([{
    name: "width",
    message: "width"
  }, {
    name: "height",
    message: "height"
  }, {
    name: "col",
    message: "number of columns"
  }, {
    name: "row",
    message: "number of rows"
  }, {
    name: "total",
    message: "total frames"
  }, {
    name: "source",
    message: "image name"
  }], function(answers) {
    var imageName = answers.source;
    var regex = /^(.+)(\..+)$/.exec(imageName);
    var name = regex[1];
    var ext = regex[2];
    var jsonObj = {};
    jsonObj.meta = {
      image: imageName
    };
    jsonObj.frames = {};
    var col = parseInt(answers.col);
    var width = parseInt(answers.width) / col;
    var height = parseInt(answers.height) / parseInt(answers.row);
    var currentCol = 0,
      currentRow = 0;
    for (var i = 0, l = parseInt(answers.total); i < l; i++) {
      var x = currentCol * width;
      var y = currentRow * height;
      jsonObj.frames[name + "_" + i + ext] = {
        frame: {
          x: x,
          y: y,
          w: width,
          h: height
        },
        rotated: false,
        trimmed: false,
        spriteSourceSize: {
          x: 0,
          y: 0,
          w: width,
          h: height
        },
        sourceSize: {
          w: width,
          h: height
        }
      };
      currentCol++;
      if (currentCol >= col) {
        currentRow++;
        currentCol = 0;
      }
    }
    require("fs").writeFile(name + ".json", JSON.stringify(jsonObj));
    callback();
  });
});
