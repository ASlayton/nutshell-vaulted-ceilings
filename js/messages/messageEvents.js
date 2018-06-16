const {createMessage,} = require('./messageFirebase');   // getAllUsers, deleteMessage, editMessage, getAllMessages,
const dom = require('./messageDom');
// const messageFirebase = require('./messageFirebase');

$('#messagesBtn').click(() =>
{
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
});

const clickMessageSubmit = () => {
  $('#message-submit').click((e) => {
    const inputMessage = $('#message-input').val();
    dom.addMessage(inputMessage);
  });
};

// Create new message Event
const pressEnterMessage = () => {
  $(document).on('keypress', (e) => {
    if (e.key === 'Enter' && !$('#messages').hasClass('hide')) {
      const inputMessage = $('#message-input').val();
      dom.addMessage(inputMessage);
    }
    const messageToAdd = {
      userUid: '',
      message: 'Whats up?',
      timestamp: 1528763298535,
      isEdited: false,
    };
    createMessage(messageToAdd);
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
  // deleteMessage();
};

module.exports = {
  initializer,
};
