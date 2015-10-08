(function(root) {
  'use strict';
  /*global EventEmitter*/

  var keys = [];

  root.keyStore = $.extend({}, EventEmitter.prototype, {

    dispatchId: root.AppDispatcher.register( function(action){
    //switch goes here
    //ADD_KEY, REMOVE_KEY
      switch (action.actionType) {
        case 'ADD_KEY':
          if(!root.keyStore.includes(action.key)) {
            keys.push(action.key);
            root.keyStore.emit('CHANGED');
          }
          break;
        case 'REMOVE_KEY':
          var idx = keys.indexOf(action.key);

          keys.splice(idx, 1);
          root.keyStore.emit('CHANGED');
          break;
        case "UPDATE_KEYS":
          keys = action.key;
          console.log(keys);
          root.keyStore.emit("CHANGED");
          break;
        default:
      }
    }),

    includes: function(keyName) {
      return (keys.indexOf(keyName) !== -1);
    },
    all: function() {
      return keys.slice();
    }
  });

  root.keyStore.setMaxListeners(15);

}(this));
