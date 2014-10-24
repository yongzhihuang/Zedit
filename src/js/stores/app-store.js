var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


var _catalog = [
    {id:1, title: 'Widget #1', cost: 1},
    {id:2, title: 'Widget #2', cost: 2},
    {id:3, title: 'Widget #3', cost: 3}
];

var _cartItems = [];


function _removeItem(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
}

function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}


function _addItem(item){
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}


var _editorContent = '';

function _updateNote(serializedNoteData) {
  console.log('update', serializedNoteData);
  _editorContent = '';
  _editorContent = serializedNoteData;
}

function _saveNote(serializedNoteData) {
  //Save it to local storage of the currently opened file
  localStorage.zedit(serializedNoteData);

  //Persist it to server
  console.log('save!');
}


var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCart:function(){
    return _cartItems;
  },

  getCatalog:function(){
    return _catalog;
  },

  getEditorContent: function() {
    return _editorContent;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    // console.log('payload', payload);
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.NEW_NOTE:
        _newNote(payload.action.item);
        break;

      case AppConstants.OPEN_NOTE:
        _openNote(payload.action.index);
        break;

      case AppConstants.UPDATE_NOTE:
        _updateNote(payload.action.serializedNoteData);
        break;

      case AppConstants.SAVE_NOTE:
        _saveNote(payload.action.serializedNoteData);
        break;

      case AppConstants.SET_OPTIONS:
        _setOptions(payload.action.index);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});

module.exports = AppStore;
