const {getAllUsers,} = require('./messageFirebase');

const printAllMessagesToDom = (strangs) => {
  $('#message-container').html(strangs);
};

const printAllMessages = (messageArray) => {
  getAllUsers()
    .then((allUsers) => {
      console.log(allUsers);
      let messagesString = '';
      messageArray.forEach((message) => {
        messagesString += `<div class="row">`;
        messagesString += `<div class="speech-bubble message-card col-md-12" data-firebase-id="${message.id}">`;
        messagesString += `<p class="message-text">${message.message}</p>`;
        messagesString += `<p class="message-text">${message.userName}</p>`;
        if (message.isEdited === true) {
          messagesString += `<span class="editedStamp"><em>(edited)</em></span><br>`;
        };
        if (message.uid === firebase.auth().currentUser.uid) {
          messagesString += `      <div class="btn-group" role="group">`;
          messagesString += `        <button type="button" class="deleteMessageBtn btn btn-primary btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
          messagesString += `        <button type="button" class="editMessageBtn btn btn-danger btn-sm" data-toggle="modal" data-target="#message-modal"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Edit</button>`;
          messagesString += `      </div>`;
        }
        messagesString += `<p>${formatDate(new Date(message.timestamp))}</p>`;
        messagesString += `  </div>`;
        messagesString += `</div>`;
      });
      printAllMessagesToDom(messagesString);
    })
    .catch((error) => {
      console.error('error in getting all users and messages in dom', error);
    });
};

const formatDate = (d) => {
  const year = d.getFullYear();
  const month = addLeadingZero(d.getMonth());
  const day = addLeadingZero(d.getDay());
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
};

const addLeadingZero = (n) => { return n < 10 ? '0' + n : '' + n; };

module.exports = {
  printAllMessages,
};
