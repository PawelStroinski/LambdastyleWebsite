var should = require('should'),
    vmModule = require('../vm'),
    vm, demoData,
    processor = { process: function () {} };

beforeEach(function () { vm = vmModule(demoData = testDemoData(), processor); });
  
describe('demoList', function () {
  it('contains flat list derived from demo data', function () {
    vm.demoList.length.should.be.equal(3);
    vm.demoList[0].text.should.match(/foo/);
    vm.demoList[1].text.should.match(/foo/);
    vm.demoList[2].text.should.match(/bar/);
    vm.demoList[0].text.should.match(/style A/);
    vm.demoList[1].text.should.match(/style B/);
    vm.demoList[2].text.should.match(/style C/);
  });
  it('points back to demo data', function () {
    vm.demoList[0].input.should.be.equal(demoData[0]);
    vm.demoList[1].input.should.be.equal(demoData[0]);
    vm.demoList[2].input.should.be.equal(demoData[1]);
    vm.demoList[0].style.should.be.equal(demoData[0].styles[0]);
    vm.demoList[1].style.should.be.equal(demoData[0].styles[1]);
    vm.demoList[2].style.should.be.equal(demoData[1].styles[0]);
  });
});

describe('demo, input, style & output', function () {
  it('by default show first demo', function () {
    vm.demo().should.equal(vm.demoList[0]);
    vm.input().should.equal('foo body');
    vm.style().should.equal('foo -> A');
    vm.output().should.equal('output A');
  });

  it('interdepend so once demo is changed input & style are set', function () {
    vm.demo(vm.demoList[2]);
    vm.input().should.equal('bar body');
    vm.style().should.equal('bar -> C');
  });
});

describe('output & error depend on input & style so once input/style change', function () {
  it('they are given to processor', function (done) {
    var gotInput, gotStyle;
    processor.process = function (input, callback) { gotInput = input.input; gotStyle = input.style; };
    vm.input('input for processor');
    vm.style('style for processor');
    setTimeout(function() {
      gotInput.should.equal('input for processor');
      gotStyle.should.equal('style for processor');
      done();
    }, vm.delay);
  });

  it('output is set and error is cleared if processors succeeds', function (done) {
    processor.process = function (input, callback) { callback(null, 'successful output'); };
    vm.error('previous error');
    vm.input('input change');
    setTimeout(function() {
      vm.output().should.equal('successful output');
      vm.error().should.be.empty;
      vm.output('');
      vm.error('previous error');
      vm.style('style change');
      setTimeout(function() {
        vm.output().should.equal('successful output');
        vm.error().should.be.empty;
        done();
      }, vm.delay); 
    }, vm.delay);
  });
  
  it('error is displayed if processor fails and output is kept intact', function (done) {
    processor.process = function (input, callback) { callback(new Error('processor error')); };
    vm.output('previous output');
    vm.input('input change');
    setTimeout(function() {
      vm.error().should.equal('processor error');
      vm.error('');
      vm.style('style change');
      setTimeout(function() {
        vm.error().should.equal('processor error');
        vm.output().should.equal('previous output');
        done();
      }, vm.delay);
    }, vm.delay);
  });
});

describe('late', function () {
  it('is true when processor doesnt return shortly', function (done) {
    processor.process = function (input, callback) { setTimeout(callback.bind(null, null, ''), vm.lateTimeout * 3); };
    vm.input('input change');
    vm.late().should.be.false;
    setTimeout(function () {
      vm.late().should.be.true;
      setTimeout(function () {
        vm.late().should.be.false;
        done();
      }, vm.lateTimeout * 2);
    }, vm.lateTimeout * 2);
  });

  it('is false when processor does return shortly', function (done) {
    processor.process = function (input, callback) { callback(null, ''); };
    vm.input('input change');
    setTimeout(function () {
      vm.late().should.be.false;
      done();
    }, vm.lateTimeout * 2);
  });
});

describe('prev', function () {
  it('moves to previous demo', function () {
    vm.prev();
    vm.demo().should.equal(vm.demoList[2]);
    vm.prev();
    vm.prev();
    vm.demo().should.equal(vm.demoList[0]);
 });
});

describe('next', function () {
  it('moves to next demo', function () {
    vm.next();
    vm.demo().should.equal(vm.demoList[1]);
    vm.next();
    vm.next();
    vm.demo().should.equal(vm.demoList[0]);
 });
});

function testDemoData() {
  return [
    { inputName: "foo", inputBody: "foo body", styles: [
        { styleName: "style A", styleBody: "foo -> A", output: "output A" },
        { styleName: "style B", styleBody: "foo -> B" } ] },
    { inputName: "bar", inputBody: "bar body", styles: [
        { styleName: "style C", styleBody: "bar -> C" } ] }
  ];
}