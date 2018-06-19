const { saveNewEvent, getMyEventsFromFb, deleteEvent, updateUserEvent, } = require('./eventsFirebase');
const { eventDomString, } = require('./eventsDom');
const { getUserEvents, } = require('../friends/getOurEvents');
const { getMyFriends, } = require('../friends/friendsCrud');

const eventsFeatureEvents = () => {
  $('#eventsBtn').click(() => {
    $('#events, #backBtn').fadeIn(1000).removeClass('hide');
    $('#welcome').addClass('hide');
    retrieveAllMyEvents();
    getMyFriendsEvent();
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
    getMyFriendsEvent();
  });

  $('#newEventBtn').click(() => {
    $('#updateEventBtn').addClass('hide');
    $('#saveEventBtn').removeClass('hide');
  });

};

const retrieveAllMyEvents = () => {
  getMyEventsFromFb()
    .then((results) => {
      eventDomString(results, 'events-mine', 'my events');
    })
    .catch((error) => {
      console.error(error);
    });
};

const getMyFriendsEvent = () => {
  getMyFriends()  // Gets a list of all your friends
    .then((myFriends) => {
      myFriends.forEach(friend => {
        if (friend.isAccepted) { // Filters friends by which ones are accepted
          getUserEvents(friend.friendUid) // Gets user events by UID
            .then((friendsEvents) => {
              eventDomString(friendsEvents, 'events-theirs', friend.username);
            });
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteAnEvent = () => {
  $(document).on('click', '.deleteEvent', (e) => {
    const eventToDelete = $(e.target).closest('.event-card').data('firebaseId');
    deleteEvent(eventToDelete)
      .then(() => {
        retrieveAllMyEvents();
        getMyFriendsEvent();
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
        getMyFriendsEvent();
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
