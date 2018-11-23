const pnrService = require('../service/pnrStatusService')
const constants = require('../constants')

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'PnrStatusIntent';

  },
  async handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    const pnrNumberSlot = currentIntent.slots['pnrNumber'];
    const pnrNumberIndex = pnrNumberSlot.value;
    const attributesManager = handlerInput.attributesManager;
    const sessionAttributes = attributesManager.getSessionAttributes();
    const pnrNumberIndexFromSession = sessionAttributes.pnrNumberIndexFromSession;


    if (pnrNumberIndexFromSession || pnrNumberIndex) {
      var speakText = ""
      //Put the slot index to session for further conversations in this session
      if (pnrNumberIndex) {
        sessionAttributes.pnrNumberIndexFromSession = pnrNumberIndex;
        speakText = await pnrService.checkPnrStatus(pnrNumberIndex)
      }
      if (pnrNumberIndexFromSession) {
        speakText = await pnrService.checkPnrStatus(pnrNumberIndexFromSession)
      }
      if (pnrNumberIndexFromSession && pnrNumberIndex) {
        speakText = await pnrService.checkPnrStatus(pnrNumberIndex)
      }
      console.log('SPEAK TEXT : ', speakText)
      //give the pnr to the user
      return handlerInput.responseBuilder
        .speak(speakText)
        .reprompt(constants.REPROMT_PNR_STATUS)
        .getResponse();
    } else {
      //tell acount number logic to elicit slot
      return handlerInput.responseBuilder
        .speak(constants.SPEAK_TEXT_ASK_PNR)
        .reprompt(constants.SPEAK_TEXT_ASK_PNR)
        .addElicitSlotDirective(pnrNumberSlot.name)
        .getResponse();
    }

  }
}
