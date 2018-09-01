// Requires the dependencies
const builder = require('botbuilder');

const db = require('../services/database.service');

// Exports the app
module.exports = (() => {

    // Service function to answer
    var dialog = (session) => [
        // Destination
        function (session) {
            session.send('Quem voce quer add? Pessoas disponiveis: %s', db.listAll().join(', '));
            session.send('Ja adicionados: %s', db.list().join(', '));
            builder.Prompts.text(session, 'Diga o nome:');
        },
        function (session, results, next) {
            var p = results.response;
            // Only adds if it's a valid person who's not already included
            if (p && db.allContains(p) && !db.contains(p)) {
                db.add(p);
                session.send(' %s adicionado', p);
            } else {
                if (db.contains(p)) {
                    session.send(' %s ja esta no almoço', p);
                } else session.send(' %s invalido', p);
            }
            next();
        },
    ];

    // External functions to export
    return dialog;
})();