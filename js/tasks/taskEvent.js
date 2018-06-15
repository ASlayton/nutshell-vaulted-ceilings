const taskDom = require('./taskDom');
const taskFirebase = require('./taskFirebase');

const clickTasks = () => {
  $(document).on('click', '#tasksBtn', taskTime);
  $(document).on('click', '#createTaskBtn', clickTaskButton);
  $(document).on('keypress', '#taskInput', pressEnter);
  $(document).on('click', '#deleteTask', deleteTask);
  isItDone();
};

const taskTime = () => {
  $('#tasks').removeClass('hide');
  $('#welcome').addClass('hide');
  getAllTasks();
  taskDom.taskString();
};

// Create New Task

const pressEnter = (e) => {
  if (e.key === 'Enter' && !$('#task').hasClass('hide')) {
    const taskWords = $('#taskInput').val();
    const taskToAdd = {
      task: taskWords,
      isComplete: false,
    };
    taskFirebase.createTask(taskToAdd)
      .then(() => {
        taskDom.newTask(taskToAdd);
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
      taskDom.newTask(taskToAdd);
    })
    .catch((error) => {
      console.error('error in creating task', error);
    });
};

// Load Tasks

const getAllTasks = () => {
  taskFirebase.getTasks()
    .then((tasksArray) => {
      taskDom.theTasksDom(tasksArray);
    })
    .catch((error) => {
      console.error('error in getting tasks', error);
    });
};

// Delete Tasks

const deleteTask = (e) => {
  const taskToDelete = $(e.target).closest('#taskCard').data('firebaseId');
  const panelToDelete = $(e.target).closest('#taskCard');
  taskFirebase.deleteTasks(taskToDelete)
    .then(() => {
      panelToDelete.remove();
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

// Completing Task

const isItDone = () => {
  $(document).on('click', '.checkbox', (e) => {
    const taskId = $(e.target).closest('#taskCard').data('firebaseId');
    const taskToUpdate = $(e.target).closest('#taskCard');
    const updatedTask = {
      task: taskToUpdate.find('.theTask').text(),
      isComplete: true,
    };
    taskFirebase.completedTask(updatedTask, taskId)
      .then(() => {
      })
      .catch((error) => {
        console.error('error on updated tasks', error);
      });
  });
};

module.exports = {
  clickTasks,
};
