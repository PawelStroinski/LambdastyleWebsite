var processorHub;

exports.process = function (input, callback) {
  if (processorHub)
    process();
  else
    $.connection.hub.start().done(function () {
      processorHub = $.connection.processorHub;
      process();
    }).fail(error);

  function process() {
    processorHub.server.process(input).done(function (output) {
      if (output.success)
        callback(null, output.body);
      else
        callback(new Error(output.body));
    }).fail(error);
  }

  function error(err) {
    callback(err);
  }
};