module.exports = {
  rn_extends_rn: function(target, source) {
    target.prototype = Object.create(source.prototype);
    target.prototype.constructor = target;
  },
  rn_json2Array_rn: function(jsonObject) {
    var returnObj = [];
    for (var i in jsonObject)
      returnObj.push(jsonObject[i]);
    return returnObj;
  },
  rn_getParameter_rn: function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },
  rn_postMessage_rn: function(msg) {
    try {
      if (parent) parent.postMessage(msg, location.origin);
    } catch (e) {
      console.error(e);
    }
  }
};