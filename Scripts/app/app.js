var ko = require('knockout'),
    vm = require('./vm'),
    knockoutCodeMirror = require('knockout-code-mirror');
require('code-mirror/mode/javascript');
require('code-mirror/theme/default');

knockoutCodeMirror({ theme: 'default' });
ko.applyBindings(vm);