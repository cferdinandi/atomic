# atomic.js [![Build Status](https://travis-ci.org/toddmotto/atomic.svg)](https://travis-ci.org/toddmotto/atomic)

atomic is a 2KB standalone module for getting a supported XHR instance, making HTTP requests and handling success/error/always callbacks. atomic has a very clean and readable syntax using Object chaining for success, error and always callbacks functions, as well as automatic JSON parsing when JSON is returned. atomic works in IE6+, but uses native JSON parsing which works in IE8+, so -IE8 won't parse the response.

#### atomic.get()
Use `atomic.get()` to make a `GET`. Success, error and always callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.get('/endpoint')
.success(function (data, xhr) {

})
.error(function (data, xhr) {

})
.always(function (data, xhr) {

});
```

#### atomic.post()
Use `atomic.post()` to make a `POST`. Success, error and always callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.post('/endpoint'[, data])
.success(function (data, xhr) {

})
.error(function (data, xhr) {

})
.always(function (data, xhr) {

});
```

#### atomic.put()
Use `atomic.put()` to make a `PUT`. Success, error and always callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.put('/endpoint'[, data])
.success(function (data, xhr) {

})
.error(function (data, xhr) {

})
.always(function (data, xhr) {

});
```

#### atomic.delete()
Use `atomic.delete()` to make a `DELETE`. Success, error and always callbacks will return the `xhr.responseText` and full `xhr` as arguments one and two.
```js
atomic.delete('/endpoint')
.success(function (data, xhr) {

})
.error(function (data, xhr) {

})
.always(function (data, xhr) {

});
```

#### atomic.setContentType()
Use `atomic.setContentType()` to change the **Content-type** request header option of the XHR instance. The default **Content-type** option is *application/x-www-form-urlencoded*.

```js
atomic.setContentType('application/json');
atomic.get('/endpoint') // this request will use application/json as Content-type
.success(function (data, xhr) {

})
.error(function (data, xhr) {

})
.always(function (data, xhr) {

});
```

## Installing with Bower
Use the repository hook:

```
bower install https://github.com/toddmotto/atomic.git
```

## Manual installation
Ensure you're using the files from the `dist` directory (contains compiled production-ready code). Ensure you place the script before the closing `</body>` tag.

```html
<body>
  <!-- html above -->
  <script src="dist/atomic.js"></script>
  <script>
  atomic.get('/endpoint')
  .success(function (data, xhr) {

  })
  .error(function (data, xhr) {

  })
  .always(function (data, xhr) {

  });
  </script>
</body>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release history
- 1.1.0
  - Added always callback and ContentType option
- 1.0.0
  - Initial release
