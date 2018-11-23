const constants = require('../constants')
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    
    return handlerInput.responseBuilder
      .speak(constants.SPEAK_TEXT_ERROR)
      .reprompt(constants.REPROMT_ERROR)
      .getResponse();
  },
};


module.exports.ErrorHandler = ErrorHandler;