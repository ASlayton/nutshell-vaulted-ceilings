let firebaseConfig = {};
let userId = '';
// let fbUserName = '';

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const setUid = (newUserId) => {
  userId = newUserId;
};

// const setUsername = (newUsername) => {
//   fbUserName = newUsername;
// };

// const createUserObj = () => {
//   const userName = $('#registerUsername').val();
//   const newUserObj = {
//     username: userName,
//     uid: userId,
//   };
//   saveUser(newUserObj);
// };

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`,
    })
      .done((user) => {
        resolve(user);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveNewUser = (newUserObj) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/users.json`,
      data: JSON.stringify(newUserObj),
    })
      .done((user) => {
        resolve(user);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  setUid,
  firebaseConfig,
  saveNewUser,
  getUserById,
};
