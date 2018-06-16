const addMessage = (message) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble col-md-12"`;
  messageString += `    <p><span>${message}</span></p>`;
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
