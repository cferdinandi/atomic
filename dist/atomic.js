/*! atomic v1.2.0 | (c) 2017 @toddmotto | https://github.com/toddmotto/atomic */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory(root));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		root.atomic = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

	'use strict';

	var exports = {};

	var config = {
		contentType: 'application/x-www-form-urlencoded'
	};

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
			success: function () {},
			error: function () {},
			always: function () {}
		};
		var XHR = root.XMLHttpRequest || ActiveXObject;
		var request = new XHR('MSXML2.XMLHTTP.3.0');

		request.open(type, url, true);
		request.setRequestHeader('Content-type', config.contentType);
		request.onreadystatechange = function () {
			var req;
			if (request.readyState === 4) {
				req = parse(request);
				if (request.status >= 200 && request.status < 300) {
					methods.success.apply(methods, req);
				} else {
					methods.error.apply(methods, req);
				}
				methods.always.apply(methods, req);
			}
		};
		request.send(data);

		var atomXHR = {
			success: function (callback) {
				methods.success = callback;
				return atomXHR;
			},
			error: function (callback) {
				methods.error = callback;
				return atomXHR;
			},
			always: function (callback) {
				methods.always = callback;
				return atomXHR;
			}
		};

		return atomXHR;
	};

	var jsonp = function (url, callback) {
		// Create script with url and callback
		var ref = root.document.getElementsByTagName( 'script' )[ 0 ];
		var script = root.document.createElement( 'script' );
		script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'callback=' + callback;

		// Insert script tag into the DOM (append to <head>)
		ref.parentNode.insertBefore( script, ref );

		// After the script is loaded (and executed), remove it
		script.onload = function () {
			this.remove();
		};
	};

	exports.get = function (src) {
		return xhr('GET', src);
	};

	exports.put = function (url, data) {
		return xhr('PUT', url, data);
	};

	exports.post= function (url, data) {
		return xhr('POST', url, data);
	};

	exports.delete = function (url) {
		return xhr('DELETE', url);
	};

	exports.jsonp = function (url, callback) {
		return jsonp(url, callback);
	};

	exports.setContentType = function(value) {
		config.contentType = value;
	};

	return exports;

});
