const messageFirebase = require('./messageFirebase');
const {printAllMessages,} = require('./messageDom');

const messageContainerEvent = () => {
  $('#messages').fadeIn(1000).removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
  retrieveAllMessages();
};

const eventBinder = () => {
  $(document).on('click', '#message-submit', clickMessageSubmit);
  $(document).on('keypress', '#message-input', pressEnterMessage);
  $(document).on('click', '.deleteMessageBtn', deleteMessageEvent);
  $(document).on('click', '.editMessageBtn', editMessageEvent);
  $(document).on('click', '#messagesBtn', messageContainerEvent);
  $(document).on('click', '#saveMessageBtn', messageEditModalEvent);
};

// Enter message click
const clickMessageSubmit = () => {
  if ($('#message-input').val() === '') {
    $('#message-submit:disabled');
  } else {
    const message = $('#message-input').val();
    const timestamp = new Date();
    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.username;
    console.log(userName);
    const messageToAdd = {
      message: message,
      timestamp: timestamp,
      isEdited: false,
      uid: userId,
      userName: userName,
    };
    messageFirebase.createMessage(messageToAdd)
      .then(() => {
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
    const timestamp = new Date();
    const userId = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.username;
    const messageToAdd = {
      message: message,
      timestamp: timestamp,
      isEdited: false,
      uid: userId,
      userName: userName,
    };
    messageFirebase.createMessage(messageToAdd)
      .then(() => {
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
  $('#message-edit-mode').val(messageToEditText);
  $('#saveMessageBtn').data('editId', messageToEditId);
};

const messageEditModalEvent = () => {
  const messageEditId = $('#saveMessageBtn').data('editId');
  const newMessage = $('#message-edit-mode').val();
  const userId = firebase.auth().currentUser.uid;
  const updatedMessageObj = {
    message: newMessage,
    timestamp: new Date(),
    isEdited: true,
    uid: userId,
  };
  messageFirebase.editMessage(updatedMessageObj, messageEditId)
    .then(() => {
      retrieveAllMessages();
    });
};

module.exports = {
  eventBinder,
};
