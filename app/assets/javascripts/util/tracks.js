/* global keyStore, KeyListener */

(function(root) {
  'use strict';

  root.Track = function(attributes) {
    this.name = attributes.name;
    this.roll = attributes.roll || [];
  };

  root.Track.prototype.startRecording = function() {
    this.roll = [];
    this.start = new Date();
  };
  root.Track.prototype.addNotes = function(notes) {
    var snapshot = {time: (new Date() - this.start),
                  notes: notes };

    this.roll.push(snapshot);
  };

  root.Track.prototype.stopRecording = function() {
    this.addNotes([]);
  };

  root.Track.prototype.play = function() {
    if (typeof this.timerID !== "undefined") {return;}
      // debugger;
    var elapsedTime = 0;
    var replayRate = 25;
    var lastSlice = {time: 0, notes: []};

    this.timerId = setInterval(function() {
      var slice = this.roll[0];
      if (slice.time < elapsedTime) {
        // debugger;
        KeyListener.updateAllKeys(slice.notes);
        lastSlice = this.roll.shift();
      }
      elapsedTime += replayRate;
    }.bind(this), replayRate);

  setTimeout(function(){
    // debugger;
      clearInterval(this.timerId);
      alert("stopped playing");
      this.timerId = undefined;
    }.bind(this), this.roll[this.roll.length - 1].time + replayRate);

  };
}(this));
