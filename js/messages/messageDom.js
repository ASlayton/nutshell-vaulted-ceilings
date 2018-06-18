const printMessageToDom = (stringz) => {
  $('#message-container').append(stringz);
};

const printAllMessagesToDom = (strangs) => {
  $('#message-container').html(strangs);
};

const printAllMessages = (messageArray) => {
  let messagesString = '';
  messageArray.forEach((message) => {
    messagesString += `<div class="row">`;
    messagesString +=   `<div class="speech-bubble message-card col-md-12" data-firebase-id="${message.id}">`;
    messagesString +=     `<p class="message-text">${message.message}</p>`;
    messagesString += `      <div class="btn-group" role="group">`;
    messagesString += `        <button type="button" class="deleteMessageBtn btn btn-primary btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
    messagesString += `        <button type="button" class="editMessageBtn btn btn-danger btn-sm" data-toggle="modal" data-target="#message-modal"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Edit</button>`;
    messagesString += `      </div>`;
    messagesString += `  </div>`;
    messagesString += `</div>`;
  });
  printAllMessagesToDom(messagesString);
};

const printNewMessage = (newMessage) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble message-card col-md-12" data-firebase-id="${newMessage.id}"`;
  messageString += `    <p class="message-text">${newMessage.message}</p>`;
  messageString += `    <div class="btn-group" role="group">`;
  messageString += `      <button type="button" class="deleteMessageBtn btn btn-primary btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
  messageString += `      <button type="button" class="editMessageBtn btn btn-danger btn-sm" data-toggle="modal" data-target="message-modal"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Edit</button>`;
  messageString += `    </div>`;
  messageString += `  </div>`;
  messageString += `</div>`;
  printMessageToDom(messageString);
};

module.exports = {
  printAllMessages,
  printNewMessage,
};
