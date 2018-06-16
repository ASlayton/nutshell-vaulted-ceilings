const {getConfig,} = require('./../firebaseApi');

let firebaseConfig = {};
// const uid = getUid();

const getAllEvents = () => {
  const allEventsArray = [];
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/events.json`,
    })
      .done((allEventsObj) => {
        if (allEventsObj !== null) {
          Object.keys(allEventsObj).forEach((fbKey) => {
            allEventsObj[fbKey].id = fbKey;
            allEventsArray.push(allEventsObj[fbKey]);
          });
          resolve(allEventsArray);
        }
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

module.exports = {
  saveNewEvent,
  getAllEvents,
};
