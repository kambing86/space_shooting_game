// var width = Symbol("width");
// var height = Symbol("height");
// var objectList = Symbol("objectList");
// class GameEngine {
//   constructor(gameWidth, gameHeight) {
//     this[width] = gameWidth;
//     this[height] = gameHeight;
//   }
//   update() {
//   }
// }
function GameEngine(gameWidth, gameHeight) {
  var that = this;
  var width = gameWidth;
  var height = gameHeight;

  that.update = function() {

  };
}
module.exports = GameEngine;
