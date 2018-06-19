const eventDomString = (eventArray, whereAt, username) => {
  const myUid = firebase.auth().currentUser.uid;
  let strang = '';
  strang += `<div class="container-fluid">`;
  strang +=   `<div class="row text-center">`;
  eventArray.forEach((event) => {
    strang +=   `<div class="col-md-3 event-card" data-firebase-id="${event.id}">`;
    strang +=     `<h3 class="evt-title">${event.title}</h3>`;
    strang +=     `<ul class="list-group">`;
    strang +=       `<li class="list-group-item">Date: <span class="evt-date">${event.date}</li>`;
    strang +=       `<li class="list-group-item">Location: <span class="evt-loc">${event.location}</li>`;
    strang +=     `</ul>`;
    if (event.uid === myUid) {
      strang +=   `<div class="btn-group" role="group">`;
      strang +=     `<button type="button" class="deleteEvent btn btn-primary btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>`;
      strang +=     `<button type="button" class="editUserEvent btn btn-danger btn-sm" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Edit</button>`;
      strang +=   `</div>`;
    } else {
      strang += `<p>${username}'s Event</p>`;

    }
    strang +=  `</div>`;
  });
  strang +=   `</div>`;
  strang += `</div>`;
  printToDom(strang, whereAt);
};

const printToDom = (string, whereToPrint) => {
  $(`#${whereToPrint}`).html(string);
};

module.exports = {
  eventDomString,
};
