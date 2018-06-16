const {authorizationEvents,} = require('./authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');
const messagesMain = require('./messages/messageMain');

retrieveKeys();
authorizationEvents();
taskMain;
messagesMain;
