const taskDom = require('./taskDom');

const clickTasks = () => {
  $(document).on('click', '#insertButtonID', taskTime);
};

const taskTime = () => {
  taskDom();
};

module.exports = {
  clickTasks,
};
