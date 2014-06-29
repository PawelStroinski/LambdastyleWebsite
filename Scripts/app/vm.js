var ko = require('knockout'),
    util = require('util'),
    vm;

module.exports = function (demoData, processor) {
  vm = {
      input: ko.observable(),
      style: ko.observable(),
      output: ko.observable(),
      demoList: demoList(demoData),
      demo: ko.observable(),
      error: ko.observable(),
      delay: 50
  }
  setInputAndStyleOnceDemoIsChanged();
  showFirstDemo();
  processAfterInputOrStyleChange(processor);
  vm.prev = prev;
  vm.next = next;
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

function processAfterInputOrStyleChange(processor) {
  ko.computed(function () {
    return vm.input() + vm.style();    
  })
  .extend({ rateLimit: { timeout: vm.delay, method: 'notifyWhenChangesStop' } })
  .subscribe(function () {
    var input = { input: vm.input(), style: vm.style() };
    processor.process(input, function (err, output) {
      if (err)
        vm.error(err.message);
      else {
        vm.error('');
        vm.output(output);
      }
    })
  });
}

function prev() {
  var index = vm.demoList.indexOf(vm.demo());
  index--;
  if (index < 0)
    index = vm.demoList.length - 1;
  vm.demo(vm.demoList[index]);
}

function next() {
  var index = vm.demoList.indexOf(vm.demo());
  index++;
  if (index > vm.demoList.length - 1)
    index = 0;
  vm.demo(vm.demoList[index]);
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