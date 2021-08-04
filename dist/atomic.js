

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], (function () {
			return factory(root);
		}));
	} else if (typeof exports === 'object') {
		module.exports = factory(root);
	} else {
		window.atomic = factory(root);
	}
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (function (window) {

	'use strict';

	//
	// Variables
	//

	var settings;

	// Default settings
	var defaults = {
		method: 'GET',
		username: null,
		password: null,
		data: {},
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		},
		responseType: 'text',
		timeout: null,
		withCredentials: false
	};
  var post_settings = {
    method: 'POST',
    username: null,
    password: null,
    data: {},
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    responseType: 'text',
    timeout: null,
    withCredentials: false
  };
  
  var delete_settings = {
    method: 'DELETE',
    username: null,
    password: null,
    data: {},
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    responseType: 'text',
    timeout: null,
    withCredentials: false
  };
  
  var put_settings = {
    method: 'PUT',
    username: null,
    password: null,
    data: {},
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    responseType: 'text',
    timeout: null,
    withCredentials: false
  };
  let Dative;
	//
	// Methods
	//

	/**
	 * Feature test
	 * @return {Boolean} If true, required methods and APIs are supported
	 */
	var supports = function () {
		return 'XMLHttpRequest' in window && 'JSON' in window && 'Promise' in window;
	};

	/**
	 * Merge two or more objects together.
	 * @param   {Object}   objects  The objects to merge together
	 * @returns {Object}            Merged values of defaults and options
	 */
	var extend = function () {

		// Variables
		var extended = {};

		// Merge the object into the extended object
		var merge = function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (var i = 0; i < arguments.length; i++) {
			var obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Parse text response into JSON
	 * @private
	 * @param  {String} req The response
	 * @return {Array}      A JSON Object of the responseText, plus the orginal response
	 */
	var parse = function (req) {
		var result;
		if (settings.responseType !== 'text' && settings.responseType !== '') {
			return {data: req.response};
		}
		try {
			result = JSON.parse(req.responseText);
		} catch (e) {
			result = req.responseText;
		}
		return {data: result};
	};

	/**
	 * Convert an object into a query string
	 * @link   https://blog.garstasio.com/you-dont-need-jquery/ajax/
	 * @param  {Object|Array|String} obj The object
	 * @return {String}                  The query string
	 */
	var param = function (obj) {

		// If already a string, or if a FormData object, return it as-is
		if (typeof (obj) === 'string' || Object.prototype.toString.call(obj) === '[object FormData]') return obj;

		// If the content-type is set to JSON, stringify the JSON object
		if (/application\/json/i.test(settings.headers['Content-type']) || Object.prototype.toString.call(obj) === '[object Array]') return JSON.stringify(obj);

		// Otherwise, convert object to a serialized string
		var encoded = [];
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
			}
		}
		return encoded.join('&');

	};

	/**
	 * Make an XHR request, returned as a Promise
	 * @param  {String} url The request URL
	 * @return {Promise}    The XHR request Promise
	 */
	var makeRequest = function (url) {
	  if (!supports()) throw 'AtomicDative: This browser does not support the methods used in this plugin.';
	  if(!Dative) throw 'AtomicDative: not found'

		// Create the XHR request
		var request = new XMLHttpRequest();

		// Setup the Promise
		var xhrPromise = new Promise(function (resolve, reject) {

			// Setup our listener to process compeleted requests
			request.onreadystatechange = function () {

				// Only run if the request is complete
				if (request.readyState !== 4) return;

				// Prevent timeout errors from being processed
				if (!request.status) return;

				// Process the response
				if (request.status >= 200 && request.status < 300) {
					// If successful
					resolve(parse(request));
				} else {
					// If failed
					reject({
						status: request.status,
						statusText: request.statusText,
						responseText : request.responseText
					});
				}

			};

			// Setup our HTTP request
			request.open(settings.method, url, true, settings.username, settings.password);
			request.responseType = settings.responseType;

			// Add headers
			for (var header in settings.headers) {
				if (settings.headers.hasOwnProperty(header)) {
					request.setRequestHeader(header, settings.headers[header]);
				}
			}

			// Set timeout
			if (settings.timeout) {
				request.timeout = settings.timeout;
				request.ontimeout = function (e) {
					reject({
						status: 408,
						statusText: 'Request timeout'
					});
				};
			}

			// Add withCredentials
			if (settings.withCredentials) {
				request.withCredentials = true;
			}

			// Send the request
			request.send(param(settings.data));

		});

		// Cancel the XHR request
		xhrPromise.cancel = function () {
			request.abort();
		};

		// Return the request as a Promise
		return xhrPromise;

	};

	var get = function(url, options){
	  
	  settings = extend(defaults, options || {});
	  return makeRequest(url);
	}
  var post = function(url,options) {
    settings = extend(post_settings, options || {});

    return makeRequest(url);
  }
  var delete_ = function(url,options) {
    settings = extend(delete_settings, options || {});
    return makeRequest(url);
  }

  var put = function(url, options) {
    settings = extend(put_settings, options || {});
    return makeRequest(url);
  }

	//
	// Public Methods
	//

  var init = {
    get,
    post,
    delete: delete_,
    put,
    install
  }
  var install = function(dative) {
    if (Dative) {
      throw 'AtomicDative: Should be installed once!'
    }
    Dative = dative;
    dative.prototype.atomic = init;
  }

	return init;

}));
