const printToTask = (stringz) => {
  $('#tasks').html(stringz);
};

const taskString = () => {
  let strang = '';
  strang += `<div class="row">`;
  strang +=   `<div class="col-lg-6">`;
  strang +=     `<div class="input-group">`;
  strang +=       `<input type="text" class="form-control" placeholder="New Task">`;
  strang +=        `<span class="input-group-btn">`;
  strang +=         `<button class="btn btn-success" type="button">Go!</button>`;
  strang +=        `</span>`;
  strang +=     `</div>`;
  strang +=   `</div>`;
  strang += `</div>`;
  printToTask(strang);
};

module.exports = {
  taskString,
};
