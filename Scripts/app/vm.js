var ko = require('knockout'),
    util = require('util');

module.exports = function(demoData) {
  var vm = {
      input: ko.observable("[1, true, \"3\"]"),
      style: ko.observable("style"),
      output: ko.observable("output"),
      demoList: demoList(demoData),
      demo: ko.observable()
  }
  vm.demo(vm.demoList[0]);
  return vm;
}

function demoList(demoData) {
  var list = [];
  demoData.forEach(function(input) {
    input.styles.forEach(function(style) {
      var text = util.format('%s ▬ %s', input.inputName, style.styleName);
      list.push({ text: text, input: input, style: style });
    });
  });
  return list;
}