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
    messagesString +=     `<p><span class="message-text">${message.message}</span>`;
    messagesString +=     `<a class="btn btn-danger deleteMessageBtn pull-right">X</a>`;
    messagesString += `    <a class="btn btn-success saveMessageBtn pull-right hide">Save</a>`;
    messagesString +=     `<a class="btn btn-warning editMessageBtn pull-right">Edit</a></p>`;
    messagesString +=   `</div>`;
    messagesString += `</div>`;
  });
  printAllMessagesToDom(messagesString);
};

const printNewMessage = (newMessage) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble message-card col-md-12" data-firebase-id="${newMessage.id}"`;
  messageString += `    <p><span class="message-text">${newMessage.message}</span>`;
  messageString += `    <a class="btn btn-danger deleteMessageBtn pull-right">X</a>`;
  messageString += `    <a class="btn btn-success saveMessageBtn pull-right hide">Save</a>`;
  messageString += `    <a class="btn btn-warning editMessageBtn pull-right">Edit</a></p>`;
  messageString += `  </div>`;
  messageString += `</div>`;
  printMessageToDom(messageString);
};

module.exports = {
  printAllMessages,
  printNewMessage,
};
