const messageFirebase = require('./messageFirebase');
const {printAllMessages, printNewMessage,} = require('./messageDom');

$('#messagesBtn').click(() => {
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
  retrieveAllMessages();
});

const eventBinder = () => {
  $(document).on('click', '#message-submit', clickMessageSubmit);
  $(document).on('keypress', '#message-input', pressEnterMessage);
  $(document).on('click', '.deleteMessageBtn', deleteMessageEvent);
  $(document).on('click', '.editMessageBtn', editMessageEvent);
};

// Enter message click
const clickMessageSubmit = () => {
  if ($('#message-input').val() === '') {
    $('#message-submit:disabled');
  } else {
    const message = $('#message-input').val();
    const date = new Date();
    const timestamp = date.getTime();
    const userId = firebase.auth().currentUser.uid;
    const messageToAdd = {
      message: message,
      timestamp: timestamp,
      isEdited: false,
      uid: userId,
    };
    messageFirebase.createMessage(messageToAdd)
      .then(() => {
        printNewMessage(messageToAdd);
        $('#message-input').val('');
        retrieveAllMessages();
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
    const userId = firebase.auth().currentUser.uid;
    const messageToAdd = {
      message: message,
      timestamp: timestamp,
      isEdited: false,
      uid: userId,
    };
    messageFirebase.createMessage(messageToAdd)
      .then(() => {
        printNewMessage(messageToAdd);
        $('#message-input').val('');
        retrieveAllMessages();
      })
      .catch((error) => {
        console.error('error in creating message', error);
      });
  };
};

const retrieveAllMessages = () => {
  messageFirebase.getAllMessages()
    .then((results) => {
      printAllMessages(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Delete message
const deleteMessageEvent = (e) => {
  const messageToDeleteId = $(e.target).closest('.message-card').data('firebaseId');
  const messageToDeleteCard = $(e.target).closest('.message-card');
  messageFirebase.deleteMessage(messageToDeleteId)
    .then(() => {
      messageToDeleteCard.remove();
      retrieveAllMessages();
    })
    .catch((error) => {
      console.error('error from delete message', error);
    });
};

// Edit message
const editMessageEvent = (e) => {
  const messageToEditId = $(e.target).closest('.message-card').data('firebaseId');
  const messageToEditCard = $(e.target).closest('.message-card');
  const messageToEditText = messageToEditCard.find('.message-text').text();
  // const timeToEdit = messageToEditCard.find('.message-time').text();   // **NEED TO ADD TIME OF MESSAGE TO DOM**
  $('#message-edit-mode').val(messageToEditText);

  $('#saveMessageBtn').click(() => {
    const newMessage = $('#message-edit-mode').val();
    const newTime = $('.message-time').val();  // **NEED TO ADD TIME OF MESSAGE TO DOM**
    const userId = firebase.auth().currentUser.uid;
    const updatedMessageObj = {
      message: newMessage,
      timestamp: newTime,
      isEdited: true,
      uid: userId,
    };
    messageFirebase.editMessage(updatedMessageObj, messageToEditId);
    $('#message-edit-mode').val('');
    retrieveAllMessages();
  });
};

// Save Edited Message

module.exports = {
  eventBinder,
};
