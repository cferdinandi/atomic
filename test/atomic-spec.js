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

    it('should send and XMLHttpRequest', function () {
      atomic.get('')
      .success(function (data, xhr) {
      })
      .error(function (data, xhr) {
      });
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalled();
    });

  });

  describe('always', function() {


    it('should be called last after success or error', function(done) {
      var result = 0;
      atomic.get('').always(function(data, xhr) {
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
      }, 10);
    });
  });

});
