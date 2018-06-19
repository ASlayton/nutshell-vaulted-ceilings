const {saveNewEvent, getMyEventsFromFb, deleteEvent, updateUserEvent,} = require('./eventsFirebase');
const {eventDomString,} = require('./eventsDom');

const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events, #backBtn').fadeIn(1000).removeClass('hide');
    $('#welcome').addClass('hide');
    retrieveAllMyEvents();
  });

  $('#eventsBackBtn').click(() => {
    $('#events').addClass('hide');
    $('#welcome').removeClass('hide');
  });

  $('#saveEventBtn').click(() => {
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
    retrieveAllMyEvents();
  });

  $('#newEventBtn').click(() => {
    $('#updateEventBtn').addClass('hide');
    $('#saveEventBtn').removeClass('hide');
  });

};

const retrieveAllMyEvents = () => {
  getMyEventsFromFb()
    .then((results) => {
      eventDomString(results, 'events-mine');
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
        retrieveAllMyEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

const editAnEvent = () => {
  $(document).on('click', '.editUserEvent', (e) => {
    const eventToEditId = $(e.target).closest('.event-card').data('firebaseId');
    const eventToEditCard = $(e.target).closest('.event-card');
    const currentTitle = eventToEditCard.find('.evt-title').text();
    const currentDate = eventToEditCard.find('.evt-date').text();
    const currentLoc = eventToEditCard.find('.evt-loc').text();
    $('#updateEventBtn').removeClass('hide');
    $('#saveEventBtn').addClass('hide');
    $('#eventTitle').val(currentTitle);
    $('#eventDate').val(currentDate);
    $('#eventLocation').val(currentLoc);
    saveEditedEvent(eventToEditId);
  });
};

const saveEditedEvent = (id) => {
  $('#updateEventBtn').click(() => {
    const newTitle = $('#eventTitle').val();
    const newDate = $('#eventDate').val();
    const newLocation = $('#eventLocation').val();
    const userId = firebase.auth().currentUser.uid;
    const updatedEventObj = {
      title: newTitle,
      date: newDate,
      location: newLocation,
      uid: userId,
    };
    updateUserEvent(updatedEventObj, id)
      .then(() => {
        retrieveAllMyEvents();
      })
      .catch((error) => {
        console.error(error);
      });
    $('#eventTitle, #eventDate, #eventLocation').val('');
  });
};

module.exports = {
  eventsFeatureEvents,
  retrieveAllMyEvents,
  deleteAnEvent,
  editAnEvent,
};
