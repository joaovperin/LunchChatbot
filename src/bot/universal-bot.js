// Requires the dependencies
const builder = require('botbuilder');

// Exports the app
module.exports = (() => {
    
    // Service function to answer
    function responseService(session){
        session.send("-> You said: %s <-", session.message.text);
    }
    
    // External functions to export
    return {
        createBot: (connector) => new builder.UniversalBot(connector, responseService)
    }
})();