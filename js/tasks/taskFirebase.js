const {getConfig,} = require('./../firebaseApi.js');

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
    $.ajax({
      method: 'GET',
      url: `${config.databaseURL}/tasks.json`,
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

const deleteTasks = (taskId) => {
  return new Promise((resolve, reject) => {
    const config = getConfig();
    $.ajax({
      method: 'DELETE',
      url: `${config.databaseURL}/tasks/${taskId}.json`,
    })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createTask,
  getTasks,
  deleteTasks,
};
