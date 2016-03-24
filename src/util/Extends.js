module.exports = function(target, source) {
  target.prototype = Object.create(source.prototype);
  target.prototype.constructor = target;
};
