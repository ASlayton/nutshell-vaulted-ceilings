const {authorizationEvents,} = require('./authEvents');
const {retrieveKeys,} = require('./apiKeys');

retrieveKeys();
authorizationEvents();
