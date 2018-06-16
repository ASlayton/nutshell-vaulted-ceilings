const clickBack = () => {
  $(document).on('click', '#backBtn', () => {
    $('#messages').addClass('hide');
    $('#tasks').addClass('hide');
    $('#events').addClass('hide');
    $('#friends').addClass('hide');
    $('#welcome').removeClass('hide');
    $('#backBtn').addClass('hide');
    hideBackBtn();
  });
};

const hideBackBtn = () => {
  $(document).on('click', '#backBtn', () => {
    if (!$('#welcome').hasClass('hide')) {
      $('#backBtn').addClass('hide');
    }
  });
};

module.exports = {
  clickBack,
};
