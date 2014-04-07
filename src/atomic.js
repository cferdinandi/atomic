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
  
  var noOp = function () {};

  var xhr = function (type, url, data, options) {
    options             = (options) ? options : {};
    options.contentType = options.contentType || 'application/x-www-form-urlencoded';
    options.url         = options.url         || url;
    options.type        = options.type        || type;
    options.type        = options.type        || 'GET'; // default if type passed neither directly, nor in options hash.
    options.data        = options.data        || data;
    
    var methods = {
      success: options.success || noOp,
      error  : options.error   || noOp
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(options.type, options.url, true);
    request.setRequestHeader('Content-type', options.contentType);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    request.send(options.data);
    return {
      success: function (callback) {
        methods.success = callback;
        return methods;
      },
      error: function (callback) {
        methods.error = callback;
        return methods;
      }
    };
  };

  exports['get'] = function (url, options) {
    return exports.ajax(url, 'GET', null, options);
  };

  exports['put'] = function (url, data, options) {
    return exports.ajax(url, 'PUT', data, options);
  };

  exports['post'] = function (url, data, options) {
    return exports.ajax(url, 'POST', data, options);
  };

  exports['delete'] = function (url, options) {
    return exports.ajax(url, 'DELETE', null, options);
  };
  
  exports['ajax'] = function (url, method, data, options) {
    if (!method && !data && !options && (url !== null && typeof url === 'object'))
    {
      options = url;
      url = null;
    }
    else if (!data && !options && (method !== null && typeof method === 'object'))
    {
      options = method;
      method = null;
    }
    return xhr(method, url, data, options);
  };

  return exports;

});
