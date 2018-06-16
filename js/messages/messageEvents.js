const {createMessage, deleteMessage, getAllMessages,} = require('./messageFirebase');   // getAllUsers, editMessage,
const dom = require('./messageDom');

$('#messagesBtn').click(() => {
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
});

// Enter message events
const clickMessageSubmit = () => {
  $('#message-submit').click((e) => {
    if ($('#message-input').val() === '') {
      $('#message-submit:disabled');
    } else {
      const messageToAdd = {
        uid: '',
        message: '',
        timestamp: '',
        isEdited: false,
      };
      createMessage(messageToAdd)
        .then(() => {
          const message = $('#message-input').val();
          dom.addMessage(message);
          $('#message-input').val('');
        })
        .catch((error) => {
          console.error('error in creating message', error);
        });
    };
  });
};

const pressEnterMessage = () => {
  $(document).on('keypress', (e) => {
    if (e.key === 'Enter' && !$('#messages').hasClass('hide')) {
      const messageToAdd = {
        uid: '',
        message: '',
        timestamp: '',
        isEdited: false,
      };
      createMessage(messageToAdd)
        .then(() => {
          const message = $('#message-input').val();
          dom.addMessage(message);
          $('#message-input').val('');
        })
        .catch((error) => {
          console.error('error in creating message', error);
        });
    };
  });
};

//   $(document).on('keypress', (e) => {
//     if (e.key === 'Enter' && !$('#messages').hasClass('hide')) {

//     }
//     const messageToAdd = {
//       uid: '',
//       message: 'Whats up?',
//       timestamp: 1528763298535,
//       isEdited: false,
//     };
//     createMessage(messageToAdd).then(() => {
//       const inputMessage = $('#message-input').val();
//       dom.addMessage(inputMessage);
//     })
//       .catch((err) =>
//       {
//         console.error('Error in adding a message', err);
//       });
//   });
// };

// Delete message
const deleteMessageEvent = () => {
  $(document).on('click', '.deleteMessageBtn', (e) => {
    const messageToDeleteId = $(e.target).closest('.message').data('firebaseId');
    deleteMessage(messageToDeleteId)
      .then(() => {
        getAllMessages();
      })
      .catch((error) => {
        console.error('error from delete message', error);
      });
  });
};

const initializer = () => {
  clickMessageSubmit();
  pressEnterMessage();
  deleteMessageEvent();
};

module.exports = {
  initializer,
};
