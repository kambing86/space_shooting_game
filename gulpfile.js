const gulp = require("gulp");
const gutil = require("gulp-util");
// const connect = require("gulp-connect");
const exec = require("child_process").exec;
const webPath = "/";
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const myDevConfig = Object.create(webpackConfig);
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
