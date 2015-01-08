var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  addItem:function(item){
    AppDispatcher.dispatch({
      actionType: AppConstants.ADD_ITEM,
      item: item
    })
  },
  removeItem:function(index){
    AppDispatcher.dispatch({
      actionType: AppConstants.REMOVE_ITEM,
      index: index
    })
  },
  decreaseItem:function(index){
    AppDispatcher.dispatch({
      actionType: AppConstants.DECREASE_ITEM,
      index: index
    })
  },
  increaseItem:function(index){
    AppDispatcher.dispatch({
      actionType: AppConstants.INCREASE_ITEM,
      index: index
    })
  }
}

module.exports = AppActions;
