// Requires the dependencies
const builder = require('botbuilder');
const botbuilder_azure = require("botbuilder-azure");

// Exports the app
module.exports = (() => {

    function createBot(connector) {
        const bot = new builder.UniversalBot(connector);
        // Setup storage
        var tableName = 'botdata';
        var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
        var tableStorage = new botbuilder_azure.AzureBotStorage({
            gzipData: false
        }, azureTableClient);

        // Set storage and listen to root
        var st = bot.get('storage');
        bot.set('storage', tableStorage); // Comment this to make it run locally
        bot.dialog('/', responseService);

        return bot;
    }

    // Service function to answer
    function responseService(session) {
        session.send("-> You said: %s <-", session.message.text);
    }

    // External functions to export
    return {
        createBot: createBot
    }
})();