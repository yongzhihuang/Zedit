var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');

var AppActions = {
  newNote: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NEW_NOTE
    });
  },
  openNote: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_NOTE
    });
  },
  saveNote: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SAVE_NOTE
    });
  },
  updateNote: function (serializedNoteData) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_NOTE,
      serializedNoteData: serializedNoteData
    });
  },
  setOptions: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_OPTIONS
    });
  },
};

module.exports = AppActions;
