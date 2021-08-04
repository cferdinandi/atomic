# AtomicDative

A tiny, Promise-based vanilla JS Ajax/HTTP plugin with great browser support.

[Download AtomicDative](https://github.com/tobithedev/atomic/archive/master.zip) / [View the demo](http://tobithedev.github.io/atomic/)




## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include AtomicDative on your site.

There are two versions of Atomic: the standalone version, and one that comes preloaded with a polyfill for ES6 Promises, which are only supported in newer browsers.


**Direct Download**

You can [download the files directly from GitHub](https://github.com/tobithedev/atomic/archive/master.zip).

```html
<script src="path/to/atomic.min.js"></script>
```

**CDN**

You can also use the [jsDelivr CDN](https://cdn.jsdelivr.net/gh/tobithedev/atomic/dist/). I recommend linking to a specific version number or version range to prevent major updates from breaking your site. Smooth Scroll uses semantic versioning.

```html
<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/tobithedev/atomic/dist/atomic.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/tobithedev/atomic@1/dist/atomic.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/tobithedev/atomic@1.0/dist/atomic.min.js"></script>

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/tobithedev/atomic@1.0.0/dist/atomic.min.js"></script>
```

**NPM**

You can also use NPM (or your favorite package manager).

```bash
npm install @atomic/dative
```

### 2. Make your Ajax request.

Pass in the requested URL, and optionally, your desired options. Request method defaults to `GET`.

Use `.then()` with a callback to handle successful responses, and `catch()` to handle errors.

```js
// A basic GET request
atomic.get('https://some-url.com')
	.then(function (response) {
		console.log(response.data); // xhr.responseText
		console.log(response.xhr);  // full response
	})
	.catch(function (error) {
		console.log(error.status); // xhr.status
		console.log(error.statusText); // xhr.statusText
	});

// A POST request
atomic.post('https://some-url-code.com')
	.then(function (response) {
		console.log(response.data); // xhr.responseText
		console.log(response.xhr);  // full response
	})
	.catch(function (error) {
		console.log(error.status); // xhr.status
		console.log(error.statusText); // xhr.statusText
	});
```



## ES6 Modules

AtomicDative does not have a default export, but does support CommonJS and can be used with native ES6 module imports.

```js
import('/path/to/atomic.min.js')
	.then(function () {
		atomic.get('https://some-url.com')
			.then(function (response) {
				console.log(response.data); // xhr.responseText
				console.log(response.xhr);  // full response
			})
			.catch(function (error) {
				console.log(error.status); // xhr.status
				console.log(error.statusText); // xhr.statusText
			});
	});
```

It uses a UMD pattern, and should also work in most major module bundlers and package managers.



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


## Canceling a Request

While Promises can't be canceled, Atomic does have an internal API for aborting your XHR request using the `cancel()` method.

In order to work, you must set your `atomic()` method to a variable without `.then()` methods. They can be called on the variable after setting.

```js
// Setup your request
var xhr = atomic.get('https://some-url.com');

// Handle responses
xhr.then(function (response) {
		console.log(response.data); // xhr.responseText
		console.log(response.xhr);  // full response
	})
	.catch(function (error) {
		console.log(error.status); // xhr.status
		console.log(error.statusText); // xhr.statusText
	});

// Cancel your request
xhr.cancel();
```



## Browser Compatibility

Atomic works in all modern browsers, and IE8 and above.

The standalone version provides native support for all modern browsers. Use the `` version (or include your own) to support IE.



## License

The code is available under the [MIT License](LICENSE.md).