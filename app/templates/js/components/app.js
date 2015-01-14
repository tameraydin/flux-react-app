var React = require('react');
var Router = require('react-router-component');
var SubPage = require('./subPage/subPage');
var Welcome = require('./welcome/content');
var Template = require('./app-template');

var Locations = Router.Locations;
var Location = Router.Location;

var APP =
  React.createClass({
    render: function() {
      return (
        <Template>
          <Locations>
            <Location path="/" handler={Welcome} />
            <Location path="/subPage" handler={SubPage} />
          </Locations>
        </Template>
        );
    }
  });

module.exports = APP;
