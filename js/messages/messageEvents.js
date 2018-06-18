const messageFirebase = require('./messageFirebase');
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
  $(document).on('click', '.editMessageBtn', editMessageEvent);
  editMessageEvent();
};

// Print all messages
const getAllMessagesEvent = () => {
  messageFirebase.getAllMessages()
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
    messageFirebase.createMessage(messageToAdd)
      .then(() => {
        printNewMessage(messageToAdd);
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
    messageFirebase.createMessage(messageToAdd)
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
  messageFirebase.deleteMessage(messageToDeleteId)
    .then(() => {
      messageToDeleteCard.remove();
    })
    .catch((error) => {
      console.error('error from delete message', error);
    });
};

// Edit message
const editMessageEvent = (e) => {
  const selectedMessage = $(e.target).closest('.message-card');
  selectedMessage.attr('id', 'editMode');
  const messageToEdit = selectedMessage.find('.message-text').text();
  const messageID = selectedMessage.data('firebaseId');
  $('#message-to-update').val(messageToEdit);
  $('#message-to-update').data('firebaseId', messageID);
  messageFirebase.editMessage();
};

// Save Edited Message

module.exports = {
  eventBinder,
};
