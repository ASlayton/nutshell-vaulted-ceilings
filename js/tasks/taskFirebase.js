const {getConfig, getUid,} = require('./../firebaseApi.js');

const createTask = (newTask) => {
  newTask.userUid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const config = getConfig();
    $.ajax({
      method: 'POST',
      url: `${config.databaseURL}/tasks.json`,
      data: JSON.stringify(newTask),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getTasks = () => {
  return new Promise((resolve, reject) => {
    const allTasks = [];
    const config = getConfig();
    const uid = getUid();
    $.ajax({
      method: 'GET',
      url: `${config.databaseURL}/tasks.json?orderBy="userUid"&equalTo="${uid}"`,
    })
      .done((allTasksObject) => {
        if (allTasksObject !== null) {
          Object.keys(allTasksObject). forEach((fbKey) => {
            allTasksObject[fbKey].id = fbKey;
            allTasks.push(allTasksObject[fbKey]);
          });
        }
        resolve(allTasks);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createTask,
  getTasks,
};
