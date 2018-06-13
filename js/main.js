const {authorizationEvents,} = require('./authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');

retrieveKeys();
authorizationEvents();
taskMain;
