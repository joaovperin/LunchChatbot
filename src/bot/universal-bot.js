// Requires the dependencies
const builder = require('botbuilder');
const azureBotBuilder = require("botbuilder-azure");

// Config the routes
const routerService = require("./services/router.service");
const dialogService = require("./services/dialog.service");

// Exports the app
module.exports = (() => {

    function createBot(connector) {
        const bot = new builder.UniversalBot(connector, dialogService.create());

        // Setup storage
        var tableName = 'botdata';
        var azureTableClient = new azureBotBuilder.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
        var tableStorage = new azureBotBuilder.AzureBotStorage({
            gzipData: false
        }, azureTableClient);

        // Set storage and listen to root
        var st = bot.get('storage');
        bot.set('storage', tableStorage); // Comment this to make it run locally

        return routerService(bot);
    }

    // External functions to export
    return {
        createBot: createBot
    }
})();