(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.atomic = factory(root);
  }
})(this, function (root) {

  'use strict';

  var exports = {};

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var xhr = function (type, url, data) {
    var methods = {
      success: [],
      error: []
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(type, url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
      var i;
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          for (i = 0; i < methods.success.length; i++) {
            methods.success[i].apply(methods, parse(request));
          }
        } else {
          for (i = 0; i < methods.error.length; i++) {
            methods.error[i].apply(methods, parse(request));
          }
        }
      }
    };
    request.send(data);
    var callbacks = {
      success: function (callback) {
        methods.success.push(callback);
        return callbacks;
      },
      error: function (callback) {
        methods.error.push(callback);
        return callbacks;
      }
    };

    return callbacks;
  };

  exports['get'] = function (src) {
    return xhr('GET', src);
  };

  exports['put'] = function (url, data) {
    return xhr('PUT', url, data);
  };

  exports['post'] = function (url, data) {
    return xhr('POST', url, data);
  };

  exports['delete'] = function (url) {
    return xhr('DELETE', url);
  };

  return exports;

});
