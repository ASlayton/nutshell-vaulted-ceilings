const {authorizationEvents,} = require('./users/authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');
const messagesMain = require('./messages/messageMain');
const friendsMain = require('./friends/friendsMain');

retrieveKeys();
authorizationEvents();
taskMain;
messagesMain;
friendsMain;
