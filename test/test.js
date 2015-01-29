'use strict';

require('should');
var events = require('events');
var mockLib = new events.EventEmitter();
var e;
mockLib.readTemperature = function(type, cb) {
  cb(e, 123);
};

describe('Module functionality', function() {
  it('Should throw an error if inited without options', function() {
    var l = require('..');
    l.should.throw();
  });
  it('Should return a function if inited correctly', function() {
    var l = require('..')({}, {});
    l.should.be.instanceOf(Object);
    l.start.should.be.instanceOf(Function);
  });
  it('Should return a value if we tell it to', function(done) {
    var l = require('..')(mockLib, {
      interval: 0.5
    });
    l.start(function(d) {
      l.stop();
      d.should.equal(123);
      done();
    });
    mockLib.emit('ready');
  });
  it('Should increase the coverage on these random features', function(done) {
    var l = require('..')(mockLib, {
      interval: 0.1,
      // Adding debug for coverage.
      debug: true
    });
    l.start(function(d) {
      l.stop();
      d.should.equal(123);
      done();
    });
    // And just to be safe. Add an error in there
    e = new Error('YOLO!');
    mockLib.emit('ready');
    setTimeout(function() {
      e = null;
    }, 300);

  });
});
