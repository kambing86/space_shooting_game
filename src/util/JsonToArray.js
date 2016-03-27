module.exports = {
  convert: function(jsonObject) {
    var returnObj = [];
    for (var i in jsonObject)
      returnObj.push(jsonObject[i]);
    return returnObj;
  }
};
