let firebaseConfig = {};

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const getUsers = () => {
  const allUsersArray = [];
  return new Promise((resolve, reject) => {
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
  firebaseConfig,
  saveNewUser,
  getUsers,
};
