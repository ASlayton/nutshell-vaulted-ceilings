const {eventsFeatureEvents, retrieveAllMyEvents, deleteAnEvent, editAnEvent,} = require('./userEventEvents');
// const {getAllEventsFromFb,} = require('./eventsFirebase');

const eventInitializer = () => {
  retrieveAllMyEvents();
  eventsFeatureEvents();
  deleteAnEvent();
  editAnEvent();
};

module.exports = {
  eventInitializer,
};
