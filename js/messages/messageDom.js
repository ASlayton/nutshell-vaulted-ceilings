const addMessage = (messageArray) => {
  let messageString = '';
  messageArray.forEach((message) => {
    messageString += `<div class="row">`;
    messageString += ` <div class="speech-bubble message-card col-md-12" data-firebase-id="${message.id}"`;
    // messageString += `  <div >`;
    messageString += `    <p><span>${message}</span>`;
    messageString += `    <a class="btn btn-danger deleteMessageBtn pull-right">X</a></p>`;
    // messageString += `  </div>`;
    messageString += ` </div>`;
    messageString += `</div>`;
  });
  printToDom($('#message-container'), messageString);
};

const printToDom = (whereToPrint, stringz) => {
  $(whereToPrint).append(stringz);
};

module.exports = {
  addMessage,
};
