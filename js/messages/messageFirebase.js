const {getConfig,} = require('./../firebaseApi.js');

// [C]REATE
const createMessage = (newMessage) => {
  newMessage.uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const config = getConfig();
    $.ajax({
      method: 'POST',
      url: `${config.databaseURL}/messages.json`,
      data: JSON.stringify(newMessage),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

// // [R]EAD
const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    const allMessagesArray = [];
    const config = getConfig();
    const uid = firebase.auth().currentUser.uid;
    $.ajax({
      method: 'GET',
      url: `${config.databaseURL}/messages.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allMessagesObj) => {
        if (allMessagesObj !== null) {
          Object.keys(allMessagesObj).forEach((fbKey) => {
            allMessagesObj[fbKey].id = fbKey;
            allMessagesArray.push(allMessagesObj[fbKey]);
          });
        }
        resolve(allMessagesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

// [U]PDATE
const editMessage = (editedMessage, messageId) => {
  editedMessage.uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const config = getConfig();
    $.ajax({
      method: 'PUT',
      url: `${config.databaseURL}/messages/${messageId}.json`,
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
    const config = getConfig();
    $.ajax({
      method: 'DELETE',
      url: `${config.databaseURL}/messages/${messageId}.json`,
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
  editMessage,
  deleteMessage,
};
