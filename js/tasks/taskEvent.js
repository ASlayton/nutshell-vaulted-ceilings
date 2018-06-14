const taskDom = require('./taskDom');
const taskFirebase = require('./taskFirebase');

const clickTasks = () => {
  $(document).on('click', '#tasksBtn', taskTime);
  $(document).on('click', '#createTaskBtn', clickTaskButton);
  $(document).on('keypress', '#taskInput', pressEnter);
};

const taskTime = () => {
  $('#tasks').removeClass('hide');
  $('#welcome').addClass('hide');
  taskDom.taskString();
  taskDom.theTasksDom();
};

const pressEnter = (e) => {
  if (e.key === 'Enter' && !$('#task').hasClass('hide')) {
    const taskWords = $('#taskInput').val();
    const taskToAdd = {
      task: taskWords,
      isComplete: false,
    };
    taskFirebase.createTask(taskToAdd)
      .then(() => {
      })
      .catch((error) => {
        console.error('error in creating task', error);
      });
  };
};

const clickTaskButton = () => {
  const taskWords = $('#taskInput').val();
  const taskToAdd = {
    task: taskWords,
    isComplete: false,
  };
  taskFirebase.createTask(taskToAdd)
    .then(() => {
    })
    .catch((error) => {
      console.error('error in creating task', error);
    });
};

module.exports = {
  clickTasks,
};
