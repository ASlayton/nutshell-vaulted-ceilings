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
    messagesString +=     `<p><span>${message}</span>`;
    messagesString +=     `<a class="btn btn-danger deleteMessageBtn pull-right">X</a></p>`;
    messagesString +=   `</div>`;
    messagesString += `</div>`;
  });
  printAllMessagesToDom(messagesString);
};

const printNewMessage = (newMessage) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble message-card col-md-12" data-firebase-id="${newMessage.id}"`;
  messageString += `    <p><span>${newMessage.message}</span>`;
  messageString += `    <a class="btn btn-danger deleteMessageBtn pull-right">X</a></p>`;
  messageString += `  </div>`;
  messageString += `</div>`;
  printMessageToDom(messageString);
};

module.exports = {
  printAllMessages,
  printNewMessage,
};
