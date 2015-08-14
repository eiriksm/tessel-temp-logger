# tessel-temp-logger
Temp logger for using with beer brewing

[![Build Status](https://travis-ci.org/eiriksm/tessel-temp-logger.svg?branch=master)](https://travis-ci.org/eiriksm/tessel-temp-logger)
[![Coverage Status](http://img.shields.io/coveralls/eiriksm/tessel-temp-logger.svg)](https://coveralls.io/r/eiriksm/tessel-temp-logger?branch=master)
[![Code Climate](http://img.shields.io/codeclimate/github/eiriksm/tessel-temp-logger.svg)](https://codeclimate.com/github/eiriksm/tessel-temp-logger)
[![Dependency Status](https://david-dm.org/eiriksm/tessel-temp-logger.svg?theme=shields.io)](https://david-dm.org/eiriksm/tessel-temp-logger)

## Usage
```js
var tessel = require('tessel');
var climateLib = require('climate-si7005');
var climate = climateLib.use(tessel.port.B);

var options = {
  debug: true, // Whether or not to spit out all kinds of debug messages.
  interval: 1  // Interval for sending data back (in seconds).
};

var ttl = require('tessel-temp-logger')(climate, options);
var numberOfChecks = 0;

// Function to call at every interval end.
function onTemperature(err, temperature) {
  console.log('Temperature at %s is %d', new Date(), temperature);
  numberOfChecks++;
  if (numberOfChecks > 3) {
    // This will stop the interval based checks.
    ttl.stop();
  }
}

// Start the temperature checking.
ttl.start(onTemperature);
```
