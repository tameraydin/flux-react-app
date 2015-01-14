var React = require('react');
var Link = require('react-router-component').Link;

var SubPage =
  React.createClass({
    render: function() {
      return (
          <div>
            This is a sub page. <Link href={'/'}>Go back</Link>.
          </div>
        );
    }
  });

module.exports = SubPage;
