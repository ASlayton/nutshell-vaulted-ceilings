const printToTask = (stringz) => {
  $('#tasks').html(stringz);
};

const printTheTasks = (strangs) => {
  $('#tasks').append(strangs);
};

const taskString = () => {
  let strang = '';
  strang += `<div class="row">`;
  strang +=   `<div class="col-sm-6 col-sm-offset-3">`;
  strang +=     `<div class="input-group">`;
  strang +=       `<input type="text" class="form-control" id="taskInput" placeholder="New Task">`;
  strang +=        `<span class="input-group-btn" id="createTaskBtn">`;
  strang +=         `<button class="btn btn-success" type="button">Go!</button>`;
  strang +=        `</span>`;
  strang +=     `</div>`;
  strang +=   `</div>`;
  strang += `</div>`;
  printToTask(strang);
};

const theTasksDom = (taskArray) => {
  let domString = '';
  taskArray.forEach((task) => {
    if (task.isComplete === true) {
      domString += `<div class="panel panel-default taskPanel done" id="taskCard" data-firebase-id='${task.id}'>`;
    } else { domString += `<div class="panel panel-default taskPanel" id="taskCard" data-firebase-id='${task.id}'>`;
    }
    domString +=  `<div class="panel-body row">`;
    domString +=   `<p class="col-sm-8 theTask">${task.task}</p>`;
    domString +=   `<input class="checkbox col-sm-1" type="checkbox"><label class="col-sm-1">Complete</label>`;
    domString +=   `</input>`;
    domString +=   `<button class="btn btn-danger btn-xs col-sm-1 col-sm-offset-1" id="deleteTask">Delete</button>`;
    domString +=  `</div>`;
    domString += `</div>`;
  });
  printTheTasks(domString);
};

const newTask = (newTasks) => {
  let domString = '';
  domString += `<div class="panel panel-default taskPanel" id="taskCard" data-firebase-id='${newTasks.id}'>`;
  domString +=  `<div class="panel-body row">`;
  domString +=   `<p class="col-sm-8 theTask">${newTasks.task}</p>`;
  domString +=   `<input class="checkbox col-sm-1" type="checkbox"><label class="col-sm-1">Complete</label>`;
  domString +=   `</input>`;
  domString +=   `<button class="btn btn-danger btn-xs col-sm-1 col-sm-offset-1" id="deleteTask">Delete</button>`;
  domString +=  `</div>`;
  domString += `</div>`;
  printTheTasks(domString);
};

module.exports = {
  taskString,
  theTasksDom,
  newTask,
};
