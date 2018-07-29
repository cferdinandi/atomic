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
			atomic('/endpoint')
				.then(function (response) {})
				.catch(function (error) {});
			expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
		});

		it('should send and XMLHttpRequest', function () {
			atomic('/endpoint')
			.then(function (response) {})
			.catch(function (error) {});
			expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
		});

		it('should set request header', function(){
			atomic('/endpoint')
			.then(function (response) {})
			.catch(function (error) {});
			expect(XMLHttpRequest.prototype.setRequestHeader).toHaveBeenCalled();
		});

	});

	describe('contentType', function(){

		beforeEach(function(){
			spyOn(XMLHttpRequest.prototype, 'setRequestHeader');
		});

		it('should use "application/x-www-form-urlencoded" as default Content-type', function(){
			atomic('/endpoint');

			expect(XMLHttpRequest.prototype.setRequestHeader)
					.toHaveBeenCalledWith('Content-type', 'application/x-www-form-urlencoded');
		});

		it('should set Content-type', function() {
			atomic('/endpoint', {
				headers: {
					'Content-type': 'application/json'
				}
			});

			expect(XMLHttpRequest.prototype.setRequestHeader)
					.toHaveBeenCalledWith('Content-type', 'application/json');
		});

	});

});