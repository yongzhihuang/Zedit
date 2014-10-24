/** @jsx React.DOM */
var React = require('react');
var MDArea = require('./MDArea.js');
var Toolbar = require('./Toolbar.js');

/*App Description:
-Simple app allows user to add/edit notes with Markdown
-Data is persist through LocalStorage, and to Server every 30 minutes
-User has option to manually persist data to server
-Option to set server interval, include real time.
-Theme toggle

*/

var App = React.createClass({

  getInitialState: function() {
    return {
      MDText: 'Start writing',
      Editor: ''
    };
  },

  startNew: function() {
    this.setState({MDText: 'Start writing'});
  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <div className="zEdit">
        <Toolbar />
        <MDArea text={this.state.MDText}/>
      </div>
    );
    /*jshint ignore:end  */
  }
});

module.exports = App;
