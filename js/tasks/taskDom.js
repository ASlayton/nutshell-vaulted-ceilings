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
    domString += `<div class="panel panel-default taskPanel">`;
    domString +=  `<div class="panel-body row">`;
    domString +=   `<p class="col-sm-6">${task.task}</p>`;
    domString +=   `<input class="checkbox col-sm-4" type="checkbox">`;
    domString +=    `<label class="col-sm-2">Complete</label>`;
    domString +=   `<button class="btn btn-danger col-sm-4">Delete</button>`;
    domString +=   `</input>`;
    domString +=  `</div>`;
    domString += `</div>`;
  });
  printTheTasks(domString);
};

const newTask = (newTasks) => {
  let domString = '';
  domString += `<div class="panel panel-default taskPanel">`;
  domString +=  `<div class="panel-body row">`;
  domString +=   `<p class="col-sm-6">${newTasks.task}</p>`;
  domString +=   `<input class="checkbox col-sm-4" type="checkbox">`;
  domString +=    `<label class="col-sm-2">Complete</label>`;
  domString +=   `<button class="btn btn-danger col-sm-4">Delete</button>`;
  domString +=   `</input>`;
  domString +=  `</div>`;
  domString += `</div>`;
  printTheTasks(domString);
};

module.exports = {
  taskString,
  theTasksDom,
  newTask,
};
