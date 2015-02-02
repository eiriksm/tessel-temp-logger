'use strict';

function TempLogger(climate, opts) {
  var self = this;
  self.log('Created new temp logger with options ', opts);
  self.climate = climate;
  self.debug = opts.debug || false;
  self.interval = opts.interval || 60000;
  self.id = Math.random();
  self.log('Starting plop logger with id', self.id);
}

TempLogger.prototype.start = function(callback) {
  var self = this;
  self.climate.on('ready', function () {
    self.log('Connected to si7005');


    var repeatFunc = function() {
      if (self.stopped) {
        return;
      }
      self.climate.readTemperature('c', function (err, temp) {
        if (err) {
          // @todo. Should probably do something more sensible here.
          self.log('Had an error in the readTemperature function. Error was: ' + err);
          return;
        }
        self.log('Sending callback for id', self.id);
        callback(temp);
      });
      self._repeater = setTimeout(repeatFunc, self.interval * 1000);
    };
    self._repeater = setTimeout(repeatFunc, self.interval * 1000);


  });
};

TempLogger.prototype.stop = function() {
  clearTimeout(this._repeater);
  this.stopped = true;
};

TempLogger.prototype.log = function() {
  if (this.debug) {
    console.log.apply(console, arguments);
  }
};

module.exports = function(lib, opts) {
  // These parameters are really required.
  if (!lib || !opts) {
    throw new Error('Please provide all options required (lib and opts)');
  }
  var climate = lib;
  return new TempLogger(climate, opts);
};
