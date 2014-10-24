/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');

/*Component Description
Toolbar will have actionable items,
New
Save
Clear
Preview
*/

var Toolbar = React.createClass({

  newNote: function() {
    AppActions.newNote();
  },

  saveNote: function() {
    //Get content currently in the editor, save it to localstorage
    var currentEditorData = AppStore.getEditorContent();
    console.log(currentEditorData);
    AppActions.saveNote(currentEditorData);

  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <div className="toolbar">
        <ul className="menubar">
          <li className="new" onClick={this.newNote}>New</li>
          <li className="open">Open</li>
          <li className="save" onClick={this.saveNote}>Save</li>
          <li className="options" onClick={this.setOptions}>Options</li>
        </ul>
      </div>
    );
    /*jshint ignore:end  */
  }
});

module.exports = Toolbar;
