let firebaseConfig = () => {};
let uid = '';

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
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

// const getAllUsers = () =>
// {
//   return new Promise ((resolve, reject) =>
//   {
//     const allUsersArr = [];
//     $.ajax(
//       {
//         method: 'GET',
//         url: `${firebaseConfig.databaseURL}/users.json`,
//       })
//       .done((allUsersObj) =>
//       {
//         if (allUsersObj !== null)
//         {
//           Object.keys(allUsersObj).forEach((fbKey) =>
//           {
//             allUsersObj[fbKey].id = fbKey;
//             allUsersArr.push(allUsersObj[fbKey]);
//           });
//         }
//         resolve(allUsersArr);
//       })
//       .fail((err) =>
//       {
//         reject(err);
//       });
//   });
// };

// [C]REATE
const createMessage = (newMessage) => {
  newMessage.uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `https://nutshell-vaulted.firebaseio.com/messages.json`,
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
    const allMessagesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/messages.json?orderBy="uid"&equalTo="${uid}"`,
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
  // getAllUsers,
  getFirebaseUrl,
  createMessage,
  getAllMessages,
  editMessage,
  deleteMessage,
  setUID,
  setConfig,
};
