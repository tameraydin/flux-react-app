var React = require('react');

var MyCustomMixin = function(cb) {
  return {
    componentWillMount: function() {
      console.log('component will mount, bind your actions...');
    },
    componentWillUnmount: function() {
      console.log('component will unmount, don\'t forget to unbind...');
    }
  };
};

module.exports = MyCustomMixin;
