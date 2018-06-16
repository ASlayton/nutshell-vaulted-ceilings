const dom = require('./messageDom');

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
};

module.exports = {
  initializer,
};
