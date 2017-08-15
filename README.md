# Atomic [![Build Status](https://travis-ci.org/cferdinandi/atomic.svg)](https://travis-ci.org/cferdinandi/atomic)

Vanilla JavaScript Ajax requests with chained success/error callbacks and JSON parsing. Supports `GET`, `POST`, `PUT`, `DELETE`, and JSONP.

Originally created and maintained by [Todd Motto](https://toddmotto.com).

[Download Atomic](https://github.com/cferdinandi/atomic/archive/master.zip) / [View the demo](http://cferdinandi.github.io/atomic/)


<hr>

### Want to learn how to write your own vanilla JS plugins? Check out ["Vanilla JS Pocket Guide series"](https://gomakethings.com/guides/) and level-up as a web developer. 🚀

<hr>



## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include Atomic on your site.

```html
<script src="dist/atomic.js"></script>
```

### 2. Make your Ajax request.

Pass in the requested URL, and optionally, the request type. Defaults to `GET`.

The `success`, `error`, and `always` callbacks run when the request is successful, when it fails, and either way, respectively. They accept the `responseText` (`data`) and full response (`xhr`) as arguments. All three callbacks are optional.

```js
// A GET request
atomic.ajax({
	url: '/endpoint.com'
})
	.success(function (data, xhr) {
		console.log(data); // xhr.responseText
		console.log(xhr); // full response
	})
	.error(function (data, xhr) {
		console.log(data); // xhr.responseText
		console.log(xhr); // full response
	})
	.always(function (data, xhr) {
		console.log(data); // xhr.responseText
		console.log(xhr); // full response
	});

// A POST request
atomic.ajax({
	type: 'POST',
	url: '/endpoint.com'
});
```

JSONP requests do not accept the callback functions. You must instead setup a global callback function and pass in the function name a string to the `callback` option. Atomic will pass the returned data into your callback as an argument (in the example below, `data`).

```js
var myCallback(data) {
	console.log(data); // full response
};

// A JSONP request
atomic.ajax({
	type: 'JSONP',
	url: '/endpoint.com',
	callback: 'myCallback'
});
```



## Installing with Package Managers

You can install Atomic with your favorite package manager or module loader directly from  NPM.

```
npm install atomicjs
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
atomic.ajax({
	type: 'GET', // {String} the request type
	url: null, // {String} the endpoint for your request
	data: {}, // {Object|Array|String} data to be sent to the server
	callback: null, // {String} The name of a global callback function (for use with JSONP)
	headers: { // {Object} Adds headers to your request: request.setRequestHeader(key, value)
		'Content-type': 'application/x-www-form-urlencoded'
	},
	responseType: 'text' // {String} the response type (https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
});
```


## Browser Compatibility

Atomic works in all modern browsers, and IE8 and above.



## How to Contribute

Please review the  [contributing guidelines](CONTRIBUTING.md).



## License

The code is available under the [MIT License](LICENSE.md).