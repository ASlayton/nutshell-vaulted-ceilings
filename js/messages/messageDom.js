const addMessage = (message) => {
  let messageString = '';
  messageString += `<div class="row">`;
  messageString += `  <div class="speech-bubble col-md-12"`;
  messageString += `    <p><span>${message}</span></p>`;
  messageString += `  </div>`;
  messageString += `</div>`;
  printToDom($('#message-container'), messageString);
  // const elem = $('#message-container');
  // elem.scrollTop = elem.scrollHeight;
  // messageString += ``;
  // messageString += ``;
  // messageString += ``;
  // messageString += ``;
  // messageString += ``;
};

const printToDom = (whereToPrint, stringz) => {
  $(whereToPrint).append(stringz);
};

module.exports = {
  addMessage,
};
