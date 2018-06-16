const {getConfig,} = require('./../firebaseApi');
let uid = '';

const setConfig = (fbConfig) => {
  getConfig = fbConfig;
};

const setUID = (newUID) => {
  uid = newUID;
};

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const getFirebaseUrl = () =>
{
  apiKeys()
    .then((result) =>
    {
      setConfig(result.firebase);
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

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

// [R]EAD
const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    const config = getConfig();
    const uid = firebase.auth().currentUser.uid;
    const allMessagesArray = [];
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
  editedMessage.uid = uid;
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
  // getAllUsers,
  getFirebaseUrl,
  createMessage,
  getAllMessages,
  editMessage,
  deleteMessage,
  setUID,
  setConfig,
};
