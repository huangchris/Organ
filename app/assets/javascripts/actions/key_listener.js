/* global AppDispatcher */

var KeyListener = {
  keyPressed: function(e) {
    var action = {
      actionType: "ADD_KEY",
      key: window.KEYBOARD[e.keyCode]
    };

    if (typeof action.key !== "undefined") {
      AppDispatcher.dispatch(action);
    }
  },

  keyUnpressed: function(e) {
    var action = {
      actionType: "REMOVE_KEY",
      key: window.KEYBOARD[e.keyCode]
    };

    if (typeof action.key !== "undefined") {
      AppDispatcher.dispatch(action);
    }
  },

  updateAllKeys: function(notes) {
    var action = {
      actionType: "UPDATE_KEYS",
      key: notes
    };
    if(typeof action.key !== "undefined") {
      AppDispatcher.dispatch(action);
    }
  }
};

$(function(){
  $(document).on("keydown", KeyListener.keyPressed);
  $(document).on("keyup", KeyListener.keyUnpressed);
});
