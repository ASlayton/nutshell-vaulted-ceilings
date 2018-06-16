const dom = require('./messageDom');
// const messageFirebase = require('./messageFirebase');

const clickMessageBtn = () => {
  $(document).on('click', '#messagesBtn', showMessages);
};

const showMessages = () => {
  $('#messages').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
};

const clickMessageSubmit = (() => {
  $('#message-submit').click((e) => {
    const message = $('#message-input').val();
    dom.addMessage(message);
  });
});

const pressEnterMessage = () => {
  $(document).on('keypress', (e) => {
    if (e.key === 'Enter' && !$('#messages').hasClass('hide')) {
      const inputMessage = $('#message-input').val();
      dom.addMessage(inputMessage);
    }
  });
};

const initializer = () => {
  clickMessageSubmit();
  pressEnterMessage();
  clickMessageBtn();
};

module.exports = {
  initializer,
};
