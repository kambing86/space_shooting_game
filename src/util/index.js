module.exports = {
  extends: function(target, source) {
    target.prototype = Object.create(source.prototype);
    target.prototype.constructor = target;
  },
  json2Array: function(jsonObject) {
    var returnObj = [];
    for (var i in jsonObject)
      returnObj.push(jsonObject[i]);
    return returnObj;
  },
  getParameter: function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
};
