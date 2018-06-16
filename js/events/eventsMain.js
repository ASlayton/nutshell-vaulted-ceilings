const {eventsFeatureEvents, retrieveAllEvents, deleteAnEvent,} = require('./userEventEvents');
// const {getAllEventsFromFb,} = require('./eventsFirebase');

const eventInitializer = () => {
  retrieveAllEvents();
  eventsFeatureEvents();
  deleteAnEvent();
};

module.exports = {
  eventInitializer,
};
