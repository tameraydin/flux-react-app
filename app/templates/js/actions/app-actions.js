var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  logClick: function(element) {
    AppDispatcher.dispatch({
      actionType: AppConstants.LOG_CLICK,
      element: element
    });
  }
};

module.exports = AppActions;
