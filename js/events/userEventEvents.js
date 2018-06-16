const {saveNewEvent,} = require('./eventsFirebase');

const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events').removeClass('hide');
    $('#welcome').addClass('hide');
  });

  $('#eventsBackBtn').click(() => {
    $('#events').addClass('hide');
    $('#welcome').removeClass('hide');
  });

  $('#saveEvent').click(() => {
    const eTitle = $('#eventTitle').val();
    const eDate = $('#eventDate').val();
    const eLocation = $('#eventLocation').val();
    const newEventObj = {
      title: eTitle,
      date: eDate,
      location: eLocation,
    };
    saveNewEvent(newEventObj);
  });
};

module.exports = {
  eventsFeatureEvents,
};
