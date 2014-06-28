var should = require('should'),
    vmModule = require('../vm'),
    vm, demoData;

beforeEach(function () { vm = vmModule(demoData = testDemoData()); });
  
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

describe('demo, input, style & output', function() {
  it('by default show first demo', function () {
    vm.demo().should.equal(vm.demoList[0]);
    vm.input().should.equal('foo body');
    vm.style().should.equal('foo -> A');
    vm.output().should.equal('output A');
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