const { getConfig, } = require('../firebaseApi');

let firebaseConfig = {};

const getMyEventsFromFb = () => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    const allEventsArray = [];
    const uid = firebase.auth().currentUser.uid;
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/events.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allEventsObj) => {
        if (allEventsObj !== null) {
          Object.keys(allEventsObj).forEach((fbKey) => {
            allEventsObj[fbKey].id = fbKey;
            allEventsArray.push(allEventsObj[fbKey]);
          });
        }
        resolve(allEventsArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveNewEvent = (newEventObj) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/events.json`,
      data: JSON.stringify(newEventObj),
    })
      .done((userEvent) => {
        resolve(userEvent);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteEvent = (id) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/events/${id}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateUserEvent = (updatedEvt, id) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/events/${id}.json`,
      data: JSON.stringify(updatedEvt),
    })
      .done((modifiedEvt) => {
        resolve(modifiedEvt);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveNewEvent,
  getMyEventsFromFb,
  deleteEvent,
  updateUserEvent,
};
