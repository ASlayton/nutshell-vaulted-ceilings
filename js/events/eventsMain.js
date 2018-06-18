const {eventsFeatureEvents, retrieveAllMyEvents, deleteAnEvent, editAnEvent,} = require('./userEventEvents');

const eventInitializer = () => {
  retrieveAllMyEvents();
  eventsFeatureEvents();
  deleteAnEvent();
  editAnEvent();
};

module.exports = {
  eventInitializer,
};
