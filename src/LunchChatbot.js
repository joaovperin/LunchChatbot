// Requires the dependencies
const builder = require('botbuilder');
const restify = require('restify');

function createBot(connector){
    // Listen and answer the same message
    return new builder.UniversalBot(connector, function (session) {
        session.send("-> You said: %s <-", session.message.text);
    });
}

// Exports the app
module.exports = (() => {
    
    // Check if running under a development profile
    const isDevelopment = process.env.LUNCH_DEV ? true : false;
    console.log("Development: " + isDevelopment);
    
    if (isDevelopment) {
        const connector = new builder.ConsoleConnector().listen();
        var bot = createBot(connector);
    } else {
        // Setup Restify Server
        const server = restify.createServer();
        server.listen(process.env.port || process.env.PORT || 3978, function () {
            console.log('%s listening to %s', server.name, server.url); 
        });
        // Create chat connector for communicating with the Bot Framework Service
        var connector = new builder.ChatConnector({
            appId: process.env.MicrosoftAppId,
            appPassword: process.env.MicrosoftAppPassword
        });
        
        // Listen for messages from users 
        server.post('/api/messages', connector.listen());
        var bot = createBot(connector);
    }
    
    // External functions to export
    return {
        run: ()=> console.log('Running')
    }
})();