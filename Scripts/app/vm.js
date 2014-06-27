var ko = require('knockout');

var vm = {
    input: ko.observable("[1, true, \"3\"]"),
    style: ko.observable("style"),
    output: ko.observable("output")
}

module.exports = vm;