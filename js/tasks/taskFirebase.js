const {getConfig,} = require('./../firebaseApi.js');

const createTask = (newTask) => {
  newTask.uid = firebase.auth().currentUser.uid;
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
    const uid = firebase.auth().currentUser.uid;
    $.ajax({
      method: 'GET',
      url: `${config.databaseURL}/tasks.json?orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allTasksObject) => {
        if (allTasksObject !== null) {
          Object.keys(allTasksObject).forEach((fbKey) => {
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

const completedTask = (updatedTask, taskId) => {
  updatedTask.uid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    const config = getConfig();
    $.ajax({
      method: 'PUT',
      url: `${config.databaseURL}/tasks/${taskId}.json`,
      data: JSON.stringify(updatedTask),
    })
      .done((modifiedTask) => {
        resolve(modifiedTask);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createTask,
  getTasks,
  deleteTasks,
  completedTask,
};
