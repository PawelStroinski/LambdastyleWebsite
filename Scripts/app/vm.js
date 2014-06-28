var ko = require('knockout'),
    util = require('util'),
    vm;

module.exports = function (demoData) {
  vm = {
      input: ko.observable(),
      style: ko.observable(),
      output: ko.observable(),
      demoList: demoList(demoData),
      demo: ko.observable()
  }
  setInputAndStyleOnceDemoIsChanged();
  showFirstDemo();
  return vm;
};

function setInputAndStyleOnceDemoIsChanged() {
  vm.demo.subscribe(function (demo) {
    vm.input(demo.input.inputBody);
    vm.style(demo.style.styleBody);
  });
}

function showFirstDemo() {
  var demo = vm.demoList[0];
  vm.demo(demo);
  vm.output(demo.style.output);
}

function demoList(demoData) {
  var list = [];
  demoData.forEach(function (input) {
    input.styles.forEach(function (style) {
      var text = util.format('%s ― %s', input.inputName, style.styleName);
      list.push({ text: text, input: input, style: style });
    });
  });
  return list;
}