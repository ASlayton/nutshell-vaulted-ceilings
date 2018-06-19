const {getConfig,} = require('./../firebaseApi');
const {apiKeys,} = require('../apiKeys');

let firebaseConfig = {};

// [C]REATE
const createMessage = (newMessageObj) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/messages.json`,
      data: JSON.stringify(newMessageObj),
    })
      .done((newMessage) => {
        resolve(newMessage);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    apiKeys()
      .then((results) => {
        const allMessagesArray = [];
        $.ajax({
          method: 'GET',
          url: `${results.firebase.databaseURL}/messages.json`,
        })
          .done((allMessagessObj) => {
            if (allMessagessObj !== null) {
              Object.keys(allMessagessObj).forEach((fbKey) => {
                allMessagessObj[fbKey].id = fbKey;
                allMessagesArray.push(allMessagessObj[fbKey]);
              });
            }
            resolve(allMessagesArray);
          })
          .fail((error) => {
            reject(error);
          });
      });
  })
    .catch((error) => {
      console.error(error);
    });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    apiKeys()
      .then((results) => {
        const allUsersArray = [];
        $.ajax({
          method: 'GET',
          url: `${results.firebase.databaseURL}/users.json`,
        })
          .done((allUsersObj) => {
            if (allUsersObj !== null) {
              Object.keys(allUsersObj).forEach((fbKey) => {
                allUsersObj[fbKey].id = fbKey;
                allUsersArray.push(allUsersObj[fbKey]);
              });
            }
            resolve(allUsersArray);
          })
          .fail((error) => {
            reject(error);
          });
      });
  })
    .catch((error) => {
      console.error(error);
    });
};

// [U]PDATE
const editMessage = (editedMessage, messageId) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/messages/${messageId}.json`,
      data: JSON.stringify(editedMessage),
    })
      .done((modifiedMessage) => {
        resolve(modifiedMessage);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

// [D]ELETE
const deleteMessage = (messageId) => {
  return new Promise((resolve, reject) => {
    firebaseConfig = getConfig();
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/messages/${messageId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createMessage,
  getAllMessages,
  getAllUsers,
  editMessage,
  deleteMessage,
};
