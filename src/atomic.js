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
  
  // need these for type checking, instanceof throws referenceError if it does not know a constructor
  var ArrayBuffer = ArrayBuffer || function () {};
  var Blob = Blob || function () {};
  var Document = Document || function () {};
  var FormData = FormData || function () {};

  var xhr = function (type, url, data, contentType) {
    var methods = {
      success: function () {},
      error: function () {}
    };
    
    var XHR = root.XMLHttpRequest || ActiveXObject;
  
    contentType = (contentType && typeof contentType === 'string' && /^.+\/.+$/.test(contentType)) ? contentType : 'application/x-www-form-urlencoded';
    
    // prevent it from sending [Object object] or some such
    // try-catch because JSON.parse will fail with cyclic objects
    if (typeof data === 'object' && !(data instanceof ArrayBuffer || data instanceof Blob || data instanceof Document || data instanceof FormData)) {
      try {
        data = JSON.stringify(data);
        contentType = 'application/json;charset=UTF-8';
      } catch(e) {
        if (e instanceof TypeError && typeof JSON !== 'undefined') {
          //cyclic object passed, call error handler
          methods.error.call(e);
        } // else do nothing, failover to standard bahaviour
      }
    }
    
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(type, url, true);
    request.setRequestHeader('Content-type', contentType);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    
    request.send(data);
    
    var callbacks = {
      success: function (callback) {
        methods.success = callback;
        return callbacks;
      },
      error: function (callback) {
        methods.error = callback;
        return callbacks;
      }
    };

    return callbacks;
  };

  exports['get'] = function (src) {
    return xhr('GET', src);
  };

  exports['put'] = function (url, data, contentType) {
    return xhr('PUT', url, data, contentType);
  };

  exports['post'] = function (url, data, contentType) {
    return xhr('POST', url, data, contentType);
  };

  exports['delete'] = function (url) {
    return xhr('DELETE', url);
  };

  return exports;

});
