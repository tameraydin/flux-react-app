var React = require('react');
var AppActions = require('../../actions/app-actions');
var AppStore = require('../../stores/app-store');

var Logger =
  React.createClass({
    componentWillMount:function() {
      AppStore.addChangeListener(function() {});
    },
    log: function(e) {
      AppActions.logClick(e.target);
    },
    render: function() {
      return (
        <span>
          <a onClick={this.log} href="#">log</a> some action
        </span>
        );
    }
  });

module.exports = Logger;