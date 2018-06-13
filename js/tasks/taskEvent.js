const taskDom = require('./taskDom');

const clickTasks = () => {
  $(document).on('click', '#tasksBtn', taskTime);
};

const taskTime = () => {
  $('#tasks').removeClass('hide');
  $('#auth').addClass('hide');
  taskDom.taskString();
};

module.exports = {
  clickTasks,
};
