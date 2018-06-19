const {eventsFeatureEvents, deleteAnEvent, editAnEvent,} = require('./userEventEvents');

const eventInitializer = () => {
  eventsFeatureEvents();
  deleteAnEvent();
  editAnEvent();
};

module.exports = {
  eventInitializer,
};
