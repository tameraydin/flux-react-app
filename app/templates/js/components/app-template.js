var React = require('react');
var Header = require('./header/header');
var Link = require('react-router-component').Link;

var Template =
  React.createClass({
    render: function() {
      return  (
        <div className="container">
          <Header />
          {this.props.children}
        </div>
        );
    }
  });

module.exports = Template;
