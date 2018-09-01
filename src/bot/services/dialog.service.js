// Requires the dependencies
const builder = require('botbuilder');

// Exports the module
module.exports = (() => {

    // Functions
    const Functions = {
        Add: 'ADD',
        Remove: 'REMOVE',
        List: 'LIST',
        Support: 'HELP'
    };

    var create = () => [
        function (session) {
            // prompt for search option
            builder.Prompts.choice(
                session,
                'Escolha uma funcao!',
                [Functions.Remove, Functions.Add, Functions.List], {
                    maxRetries: 3,
                    retryPrompt: 'Nao eh uma opcao valida'
                });
        },
        function (session, result) {
            // Invalid state
            if (!result.response) {
                session.send('Estado invalido, restartando');
                return session.endDialog();
            }

            // On error, start over
            session.on('error', function (err) {
                session.send('Deu exception e nao sei oq fazer, restartando bot :D');
                session.send('Erro: %s', err.message);
                session.endDialog();
            });

            // Evaluates the dialog
            var selection = result.response.entity;
            switch (selection) {
                case Functions.Remove:
                    return session.beginDialog('remove');
                case Functions.Add:
                    return session.beginDialog('add');
                case Functions.List:
                    return session.beginDialog('list');
            }
        }
    ];

    return {
        create: create
    }
})();