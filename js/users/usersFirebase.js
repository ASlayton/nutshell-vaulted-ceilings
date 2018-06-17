const {getConfig,} = require('./../firebaseApi');

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const allUsersArray = [];
    const firebaseConfig = getConfig();
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/users.json`,
    })
      .done((allUsersObj) => {
        if (allUsersObj !== null) {
          Object.keys(allUsersObj).forEach((fbKey) => {
            allUsersObj[fbKey].id = fbKey;
            allUsersArray.push(allUsersObj[fbKey]);
          });
          resolve(allUsersArray);
        }
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const saveNewUser = (newUserObj) => {
  return new Promise((resolve, reject) => {
    const firebaseConfig = getConfig();
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
  saveNewUser,
  getUsers,
};
