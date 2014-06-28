var fs = require('fs');
var ko = require('knockout'),
    vm = require('./vm'),
    knockoutCodeMirror = require('knockout-code-mirror');
require('code-mirror/mode/javascript');
require('code-mirror/theme/default');

knockoutCodeMirror({ theme: 'default' });
var demoData = JSON.parse(fs.readFileSync(__dirname + '/demo.json', 'utf8'));
ko.applyBindings(vm(demoData));