const trainStatusService = require('../service/trainStatusService')
const constants = require('../constants')
module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'TrainStatusIntent';

  },
  async handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    const trainNumberSlot = currentIntent.slots['trainNumber'];
    const trainNumberIndex = trainNumberSlot.value;


    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const trainNumberIndexFromSession = sessionAttributes.trainNumberIndexFromSession;
    console.log('TRAIN NUMBER ', trainNumberIndexFromSession, trainNumberIndex)
    if (trainNumberIndexFromSession || trainNumberIndex) {
      var speakText = ""
      //Put the slot index to session for further conversations in this session
      if (trainNumberIndex) {
        sessionAttributes.trainNumberIndexFromSession = trainNumberIndex;
        await trainStatusService.checkTrainStatus({ train_number: trainNumberIndex })
          .then((resp) => {
            speakText = resp
          })
          .catch((error) => {
            speakText = error
          })
      }
      if (trainNumberIndexFromSession) {
        await trainStatusService.checkTrainStatus({ train_number: trainNumberIndex })
          .then((resp) => {
            speakText = resp
          })
          .catch((error) => {
            speakText = error
          })
      }
      if (trainNumberIndexFromSession && trainNumberIndex) {
        await trainStatusService.checkTrainStatus({ train_number: trainNumberIndex })
          .then((resp) => {
            speakText = resp
          })
          .catch((error) => {
            speakText = error
          })
      }
      console.log('SPEAK TEXT', speakText)
      //give the train status to the user
      return handlerInput.responseBuilder
        .speak(speakText)
        .reprompt(constants.REPROMT_TRAIN_STATUS)
        .getResponse();
    } else {
      // Ask for train number
      return handlerInput.responseBuilder
        .speak(constants.SPEAK_TEXT_ASK_TRAIN_NUMBER)
        .reprompt(constants.SPEAK_TEXT_ASK_TRAIN_NUMBER)
        .addElicitSlotDirective(trainNumberSlot.name)
        .getResponse();
    }

  }
}
