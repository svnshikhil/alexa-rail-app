
const Alexa = require('ask-sdk-core');


/* Skill Handlers */
var genericHandler = require('./handler/generic');
var errorHandler = require('./handler/error');
var pnrStatushandler = require('./handler/pnrStatushandler')
var trainStatusHandler = require('./handler/trainStatusHandler')


/* INTENT HANDLERS */

const skillBuilder = Alexa.SkillBuilders.custom();

/* LAMBDA SETUP */
exports.handler = skillBuilder
   .addRequestHandlers(
      genericHandler.LaunchRequestHandler,
      genericHandler.HelpHandler,
      genericHandler.FallbackHandler,
      genericHandler.ExitHandler,
      genericHandler.SessionEndedRequestHandler,
      pnrStatushandler,
      trainStatusHandler
   )
   .addErrorHandlers(errorHandler.ErrorHandler)
   .lambda();
