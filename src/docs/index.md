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