/**
 * atomic.js
 */
describe('atomic', function () {

	/**
	 * xhr
	 */
	describe('xhr', function () {

		beforeEach(function () {
			spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
			spyOn(XMLHttpRequest.prototype, 'send');
			spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
		});

		it('should open an XMLHttpRequest', function () {
			atomic.ajax({
				url: '/endpoint'
			})
				.success(function (data, xhr) {})
				.error(function (data, xhr) {})
				.always(function(data, xhr) {});
			expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
		});

		it('should send and XMLHttpRequest', function () {
			atomic.ajax({
				url: '/endpoint'
			})
				.success(function (data, xhr) {})
				.error(function (data, xhr) {});
			expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
		});

		it('should set request header', function(){
			atomic.ajax({
				url: '/endpoint'
			})
				.success(function (data, xhr) {})
				.error(function (data, xhr) {})
				.always(function(data, xhr){});
			expect(XMLHttpRequest.prototype.setRequestHeader).toHaveBeenCalled();
		});

	});

	describe('always', function() {

		it('should be called last after success or error', function(done) {
			var result = 0;
			atomic.ajax({
				url: '/endpoint'
			})
				.always(function(data, xhr) {
					result = 3;
				})
				.success(function(data, xhr) {
					result  = 1;
				})
				.error(function(data, xhr) {
					result  = 2;
				});
			setTimeout(function() {
				expect(result).toEqual(3);
				done();
			}, 100);
		});
	});

	describe('contentType', function(){

		beforeEach(function(){
			spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
		});

		it('should use "application/x-www-form-urlencoded" as default Content-type', function(){
			atomic.ajax({
				url: '/endpoint'
			});

			expect(XMLHttpRequest.prototype.setRequestHeader)
					.toHaveBeenCalledWith('Content-type', 'application/x-www-form-urlencoded');
		});

		it('should set Content-type', function() {
			atomic.ajax({
				url: '/endpoint',
				headers: {
					'Content-type': 'application/json'
				}
			});

			expect(XMLHttpRequest.prototype.setRequestHeader)
					.toHaveBeenCalledWith('Content-type', 'application/json');
		});

	});

});