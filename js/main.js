const {authorizationEvents,} = require('./users/authEvents');
const {retrieveKeys,} = require('./apiKeys');
const taskMain = require('./tasks/taskMain');
const {eventsFeatureEvents,} = require('./events/userEventEvents');

retrieveKeys();
authorizationEvents();
taskMain;
eventsFeatureEvents();
