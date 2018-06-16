const {saveNewEvent, getAllEventsFromFb, deleteEvent,} = require('./eventsFirebase');
const {eventDomString,} = require('./eventsDom');

const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events, #backBtn').fadeIn(500).removeClass('hide');
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
    const userId = firebase.auth().currentUser.uid;
    const newEventObj = {
      title: eTitle,
      date: eDate,
      location: eLocation,
      uid: userId,
    };
    saveNewEvent(newEventObj);
    $('#eventTitle, #eventDate, #eventLocation').val('');
    retrieveAllEvents();
  });
};

const retrieveAllEvents = () => {
  getAllEventsFromFb()
    .then((results) => {
      eventDomString(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteAnEvent = () => {
  $(document).on('click','.deleteEvent', (e) => {
    const eventToDelete = $(e.target).closest('.event-card').data('firebaseId');
    deleteEvent(eventToDelete)
      .then(() => {
        retrieveAllEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

module.exports = {
  eventsFeatureEvents,
  retrieveAllEvents,
  deleteAnEvent,
};
