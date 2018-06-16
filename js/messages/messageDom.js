const addMessage = (message, myCollectionMode = true) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble col-md-12"`;;
  if (myCollectionMode) {
    messageString += `  <div class="message-card" data-firebase-id="${message.id}">`;
    messageString += `    <p><span>${message}</span>`;
    messageString += `    <a class="btn btn-danger deleteMessageBtn pull-right">X</a></p>`;
  } else {
    messageString += `  <div class="message-card" data-firebase-id="${message.id}">`;
    messageString += `    <p><span>${message}</span></p>`;
  }
  messageString += `    </div>`;
  messageString += `  </div>`;
  messageString += `</div>`;
  printToDom($('#message-container'), messageString);
};

const printToDom = (whereToPrint, stringz) => {
  $(whereToPrint).append(stringz);
};

module.exports = {
  addMessage,
};
