const util = require('./util');

module.exports = (method, path, data, callback) => {
  const request = {
    type: method,
    url: path,
    data: JSON.stringify(data),
    contentType: 'application/json; charset=utf-8',
  };
  if (util.isFunction(callback)) {
    request.success = (result) => callback(null, result);
    request.failure = (errMsg) => callback(errMsg, null);
  }
  $.ajax(request);
};
