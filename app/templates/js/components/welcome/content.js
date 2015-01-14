var React = require('react');
var Link = require('react-router-component').Link;
var Logger = require('./Logger');

var Welcome =
  React.createClass({
    render: function() {
      return (
          <div>
            Hello! Click <Link href={'/subPage'}>here</Link> to navigate or <Logger />.
          </div>
        );
    }
  });

module.exports = Welcome;
