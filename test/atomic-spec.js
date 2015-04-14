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
    });

    it('should open an XMLHttpRequest', function () {
      atomic.get('')
      .success(function (data, xhr) {
      })
      .error(function (data, xhr) {

      });
      expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
    });

  });

});
