// Requires the dependencies
const builder = require('botbuilder');

const db = require('../services/database.service');

// Exports the module
module.exports = (() => {

    // Service function to answer
    var dialog = (session) => [
        // Destination
        function (session) {
            session.send('Voce quer remover quem?');
            builder.Prompts.text(session, db.list().join(', '));
        },
        function (session, results, next) {
            var p = results.response;
            // Remove if it's valid
            if (p && db.contains(p)) {
                db.remove(p);
                session.send(' %s removido com sucesso', p);
            } else {
                session.send(' %s nao existe', p);
            }
            next();
        },
    ];

    // External functions to export
    return dialog;
})();