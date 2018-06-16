const {createMessage, deleteMessage, getAllMessages,} = require('./messageFirebase');
const {printAllMessages, printNewMessage,} = require('./messageDom');

$('#messagesBtn').click(() => {
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
  getAllMessagesEvent();
});

const eventBinder = () => {
  $(document).on('click', '#message-submit', clickMessageSubmit);
  $(document).on('keypress', '#message-input', pressEnterMessage);
  $(document).on('click', '.deleteMessageBtn', deleteMessageEvent);
};

// Print all messages
const getAllMessagesEvent = () => {
  getAllMessages()
    .then((messagesArray) => {
      printAllMessages(messagesArray);
    })
    .catch((error) => {
      console.error('error in get messages event', error);
    });
};

// Enter message click
const clickMessageSubmit = () => {
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
        printNewMessage(message);
        $('#message-input').val('');
      })
      .catch((error) => {
        console.error('error in creating message', error);
      });
  };
};

// Enter message keypress
const pressEnterMessage = (e) => {
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
        printNewMessage(messageToAdd);
        $('#message-input').val('');
      })
      .catch((error) => {
        console.error('error in creating message', error);
      });
  };
};

// Delete message
const deleteMessageEvent = (e) => {
  const messageToDeleteId = $(e.target).closest('.speech-bubble').data('firebaseId');
  const messageToDeleteCard = $(e.target).closest('.speech-bubble');
  deleteMessage(messageToDeleteId)
    .then(() => {
      messageToDeleteCard.remove();
    })
    .catch((error) => {
      console.error('error from delete message', error);
    });
};

module.exports = {
  eventBinder,
};
