const taskDom = require('./taskDom');

const clickTasks = () => {
  $(document).on('click', '#insertButtonID', taskTime);
};

const taskTime = () => {
  $('#tasks').removeClass('hide');
  taskDom();
};

module.exports = {
  clickTasks,
};
