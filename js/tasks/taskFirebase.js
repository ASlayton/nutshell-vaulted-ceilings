const createTask = (newTask) => {
  newTask.userUid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `https://nutshell-vaulted.firebaseio.com/tasks.json`,
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

// const getTasks = () => {
//   return new Promise((resolve, reject) => {
//     const allTasks = [];
//     $.ajax({
//       method: 'GET',
//       url: `https://nutshell-vaulted.firebaseio.com/tasks.json?orderBy="userUid"&equalTo="${userUid}"`,
//     })
//       .done((allTasksObject) => {
//         if (allTasksObject !== null) {
//           Object.keys(allTasksObject). forEach((fbKey) => {
//             allTasksObject[fbKey].id = fbKey;
//             allTasks.push(allTasksObject[fbKey]);
//           });
//         }
//         resolve(allTasks);
//       })
//       .fail((error) => {
//         reject(error);
//       });
//   });
// };

module.exports = {
  createTask,
  // getTasks,
};
