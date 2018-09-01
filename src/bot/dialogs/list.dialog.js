// Requires the dependencies
const builder = require('botbuilder');

const db = require('../services/database.service');

// Exports the app
module.exports = (() => {

    // Service function to answer
    function dialog(session) {
        session.send('Pessoas validas: %s', db.listAll().join(', '));
        session.send('Pessoas no almoco: %s', db.list().join(', '));
        session.endDialog();
    }

    // External functions to export
    return () => dialog;
})();