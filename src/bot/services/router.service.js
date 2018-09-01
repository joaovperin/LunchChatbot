// Requires the dependencies
const supportService = require('./support.service');

const addDialog = require('../dialogs/add.dialog');
const removeDialog = require('../dialogs/remove.dialog');
const listDialog = require('../dialogs/list.dialog');

// Exports the service
module.exports = (bot) => {

    // Main dialogs
    bot.dialog('add', addDialog());
    bot.dialog('remove', removeDialog());
    bot.dialog('list', listDialog());

    // Help dialog
    bot.dialog('support', supportService).triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });

    // Error logging at console
    bot.on('error', function (e) {
        console.log('Deu um erro: ', e);
    });

    return bot;
};