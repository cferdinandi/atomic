Atomic is already loaded on this page. See it in action by copy/pasting some of the samples below into the Console window in Developer Tools.

## `GET`

```javascript
atomic('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		console.log('success data', response.data); // xhr.responseText
		console.log('success full response', response.xhr);  // full response
	})
	.catch(function (error) {
		console.log('error code', error.status); // xhr.status
		console.log('error description', error.statusText); // xhr.statusText
	});
```

## `POST`

```javascript
atomic('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	data: {
		title: 'foo',
		body: 'bar',
		userId: 1
	}
})
	.then(function (response) {
		console.log('success data', response.data); // xhr.responseText
		console.log('success full response', response.xhr);  // full response
	})
	.catch(function (error) {
		console.log('error code', error.status); // xhr.status
		console.log('error description', error.statusText); // xhr.statusText
	});
```

## Chaining

You can make another `atomic()` call within a `.then()` callback and pass the response into the chain.

```javascript
atomic('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		console.log('all posts', response.data); // xhr.responseText
		return atomic('https://jsonplaceholder.typicode.com/posts/' + response.data[0].id);
	})
	.then(function (post) {
		console.log('first post', post.data);
	})
	.catch(function (error) {
		console.log('error code', error.status); // xhr.status
		console.log('error description', error.statusText); // xhr.statusText
	});
```

## With an Error

```javascript
atomic('https://jsonplaceholder.typicode.com/postses')
	.then(function (response) {
		console.log('success data', response.data); // xhr.responseText
		console.log('success full response', response.xhr);  // full response
	})
	.catch(function (error) {
		console.log('error code', error.status); // xhr.status
		console.log('error description', error.statusText); // xhr.statusText
	});
```

## Chaining with an Error

When chaining calls, any errors in the chain will get caught by your `.catch()` callback, so you only need one.

```javascript
atomic('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		console.log('all posts', response.data); // xhr.responseText
		return atomic('https://jsonplaceholder.typicode.com/postses/' + response.data[0].id);
	})
	.then(function (post) {
		console.log('first post', post.data);
	})
	.catch(function (error) {
		console.log('error code', error.status); // xhr.status
		console.log('error description', error.statusText); // xhr.statusText
	});
```

## Canceling a Request

In order to work, you must set your `atomic()` method to a variable without `.then()` methods. They can be called on the variable after setting.

```js
// Setup your request
var xhr = atomic('https://jsonplaceholder.typicode.com/posts');

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