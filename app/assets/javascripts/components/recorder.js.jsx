/* global React, Track, keyStore*/

(function(root) {
  'use strict';

  root.Recorder = React.createClass({
    getInitialState: function() {
      return { recording: false, track: new Track( {name: ""} ) };
    },

    componentDidMount: function(){
      keyStore.on("CHANGED", function() {
        if (this.state.recording){ this.state.track.addNotes( keyStore.all());}
      }.bind(this));
    },

    handler: function() {
        this.setState({recording: !this.state.recording});
        (this.state.recording ? this.state.track.stopRecording() : this.state.track.startRecording());
      },

    render: function() {
      var method = this.state.recording ? "Stop" : "Start";
      return (
        <div>
          <button onClick={this.handler}>{method}</button>
          <button onClick={this.state.track.play.bind(this.state.track)}>Play</button>
        </div>
      );
    }
  });

}(this));
