/* global React, KeyListener, Note, TONES, keyStore */
(function(root) {
  'use strict';
  root.Key = React.createClass({
    getInitialState: function() {
      return {pressed: false};
    },

    render: function() {
      var className="key";
      if (this.state.pressed) { className += " pressed"; }
      if(this.props.keyName[1] === "S") { className += " sharp"; }
      return (<div className={className}>{this.props.keyName}</div>);
    },


    componentDidMount: function() {
      this.note = new root.Note(TONES[this.props.keyName]);
      //register at the store.
      keyStore.on("CHANGED", function() {
        if(keyStore.includes(this.props.keyName)) {
          this.setState( {pressed: true} );
          this.note.start();
        } else {
          this.setState( {pressed: false} );
          this.note.stop();
        }
      }.bind(this));
    }

  });

  root.Organ = React.createClass({
    render: function(){
      return(
        <div className="organ">
          {Object.keys(window.TONES).map(function(tone){
            return <root.Key key={tone} keyName={tone}/>;
          })}
        </div>
      );
    }
  });

}(this));

$(function(){
  React.render(
  <window.Organ/>,
  document.getElementById("content"));

  React.render(
  <window.Recorder/>,
  document.getElementById("content-recorder"));
});
