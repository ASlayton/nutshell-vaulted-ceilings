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
      const message = $('#message-input').val();
      const date = new Date();
      const timestamp = date.getTime();
      const messageToAdd = {
        message: message,
        timestamp: timestamp,
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
      const message = $('#message-input').val();
      const date = new Date();
      const timestamp = date.getTime();
      const messageToAdd = {
        message: message,
        timestamp: timestamp,
        isEdited: false,
      };
      createMessage(messageToAdd)
        .then(() => {
          // const message = $('#message-input').val();
          dom.addMessage(messageToAdd);
          $('#message-input').val('');
        })
        .catch((error) => {
          console.error('error in creating message', error);
        });
    };
  });
};

// Delete message
const deleteMessageEvent = () => {
  $(document).on('click', '.deleteMessageBtn', (e) => {
    const messageToDeleteId = $(e.target).closest('.message-card').data('firebaseId');
    const messageToDeleteCard = $(e.target).closest('.speech-bubble');
    console.log(messageToDeleteId);
    deleteMessage(messageToDeleteId)
      .then(() => {
        messageToDeleteCard.remove();
        getAllMessages();
        // dom.addMessage();
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
