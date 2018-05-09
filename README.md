# Atomic [![Build Status](https://travis-ci.org/cferdinandi/atomic.svg)](https://travis-ci.org/cferdinandi/atomic)

A tiny, Promise-based vanilla JS Ajax/HTTP plugin with great browser support. Supports `GET`, `POST`, `PUT`, `DELETE`.

[Download Atomic](https://github.com/cferdinandi/atomic/archive/master.zip) / [View the demo](http://cferdinandi.github.io/atomic/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out ["Vanilla JS Pocket Guide series"](https://gomakethings.com/guides/) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Atomic on your site.

There are two versions of Atomic: the standalone version, and one that comes preloaded with a polyfill for ES6 Promises, which are only supported in newer browsers.

If you're including your own polyfill or don't want to enable this feature for older browsers, use the standalone version. Otherwise, use the version with the polyfill.

```html
<script src="dist/atomic.js"></script>
```

### 2. Make your Ajax request.

Pass in the requested URL, and optionally, your desired options. Request method defaults to `GET`.

Use `.then()` with a callback to handle successful responses, and `catch()` to handle errors.

```js
// A basic GET request
atomic('https://some-url.com')
	.then(function (response) {
		console.log(response.data); // xhr.responseText
		console.log(response.xhr);  // full response
	})
	.catch(function (error) {
		console.log(error.status); // xhr.status
		console.log(error.statusText); // xhr.statusText
	});

// A POST request
atomic('https://some-url.com', {
	method: 'POST'
})
	.then(function (response) {
		console.log(response.data); // xhr.responseText
		console.log(response.xhr);  // full response
	})
	.catch(function (error) {
		console.log(error.status); // xhr.status
		console.log(error.statusText); // xhr.statusText
	});
```



## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles, lints, and minifies code.

### Dependencies
Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp watch` automatically compiles files when changes are made and applies changes using [LiveReload](http://livereload.com/).
	- `gulp test` runs unit tests.



## Options and Settings

Atomic includes smart defaults and works right out of the box. You can pass options into Atomic through the `ajax()` function:

```js
atomic('https://some-url.com', {
	method: 'GET', // {String} the request type
	username: null, // {String} an optional username for authentication purposes
	password: null, // {String} an optional password for authentication purposes
	data: {}, // {Object|Array|String} data to be sent to the server
	headers: { // {Object} Adds headers to your request: request.setRequestHeader(key, value)
		'Content-type': 'application/x-www-form-urlencoded'
	},
	responseType: 'text', // {String} the response type (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
	withCredentials: false // {Boolean} If true, send credentials with request (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
});
```


## Migrating from Atomic 3

### New Features

- Atomic is now Promise-based, and supports chaining with `.then()` and `.catch()`.
- For simple requests, you can now just pass in a URL to `atomic()` like you would with the Fetch API. You no longer need to pass in an object with the `url` parameter.

### Breaking Changes

- You *must* pass in a URL as the first argument. The URL as an options parameter is no longer support.
- You now pass arguments directly into `atomic()`. The `atomic.ajax()` method no longer exists.
- The `.success()`, `.error()`, and `.always()` callbacks have been removed. Use `.then()` and `.catch()` instead.
- JSONP support has been removed.

You can still download Atomic 3 and earlier on [the releases page](https://github.com/cferdinandi/atomic/releases).



## Browser Compatibility

Atomic works in all modern browsers, and IE8 and above.

The standalone version provides native support for all modern browsers. Use the `.polyfills` version (or include your own) to support IE.



## Support

Please review the [support guidelines](SUPPORT.md).



## License

The code is available under the [MIT License](LICENSE.md).