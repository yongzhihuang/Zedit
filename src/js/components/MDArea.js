/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var AppActions = require('../actions/app-actions.js');

/*App Description:
This is a Text area where the user can input text using Markdown
When preview button is pressed, the screen will toggle to preview div and hide the editor div, the preview button will then turn to edit mode

*/

function editorContent(){
  return {
    text: AppStore.getEditorContent(),
    placeholder: 'start writing something'
  };
}

//We need to cache the mediumEditor object once it's initialized
//For usage and reference later
//TODO: Why can't this be set in a state?
var mediumEditorCache;

var MDArea = React.createClass({
  getInitialState: function(){
    return editorContent();
  },

  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState(editorContent());
  },

  updateNoteData: function() {
    //Syncs to the store the data of the content editable and broadcast it
    var serializedNoteData = mediumEditorCache.serialize()['element-0'].value;
    console.log('serializedNoteData', mediumEditorCache.serialize()['element-0']);
    AppActions.updateNote(serializedNoteData);
  },

  componentDidMount: function(e) {
    var editor = new MediumEditor('.editable', {
      buttons: ['bold', 'italic', 'underline', 'anchor', 'image', 'header1', 'header2', 'quote'],
    });

    //save the editor as a state for caching and access from other functions
    mediumEditorCache = editor;

  },

  render: function () {
    /*jshint ignore:start  */
    return (
      <div>
        <div 
          className="EditArea editable" 
          data-placeholder={this.state.placeholder}
          onInput={this.updateNoteData}
          dangerouslySetInnerHTML={{
            __html: this.state.text
          }}/>
      </div>
    );
    /*jshint ignore:end  */
  }
});

module.exports = MDArea;
