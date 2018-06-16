const dom = require('./messageDom');
// const messageFirebase = require('./messageFirebase');

const clickMessageBtn = () => {
  $(document).on('click', '#messagesBtn', showMessages);
};

const showMessages = () => {
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
};

const clickMessageSubmit = () => {
  $('#message-submit').click((e) => {
    const message = $('#message-input').val();
    dom.addMessage(message);
  });
};

// Create new message
const pressEnterMessage = () => {
  $(document).on('keypress', (e) => {
    if (e.key === 'Enter' && !$('#messages').hasClass('hide')) {
      const inputMessage = $('#message-input').val();
      dom.addMessage(inputMessage);
    }
  });
};

// Delete message
// const deleteMessage = () => {
//   $(document).on('click', '.deleteMessageBtn', (e) => {
//     const messageToDeleteId = $(e.target).closest('.message').data('firebaseId');
//     firebaseApi.deleteForecastFromDb(forecastToDeleteId)
//       .then(() => {
//         getMessages();
//       })
//       .catch((error) => {
//         console.error('error from delete message', error);
//       });
//   });
// };

const initializer = () => {
  clickMessageSubmit();
  pressEnterMessage();
  clickMessageBtn();
  // deleteMessage();
};

module.exports = {
  initializer,
};
