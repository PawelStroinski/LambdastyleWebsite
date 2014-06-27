var should = require('should'),
    vm = require('../vm');

describe('vm', function () {
  it('has some observables', function () {
    vm.style().should.equal('style');
  });
});