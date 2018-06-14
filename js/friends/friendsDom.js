const domStringBuild = (allUsersArr) =>
{
  let domString = '';
  allUsersArr.forEach(user =>
  {
    domString += `<div class="col-md-100 userCard">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body">`;
    domString += `<h3 data-friendUid="${user.uid}">${user.username}</h3>`;
    domString += `<button class="btn btn-danger addThisFriend">Add</button>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#newFriendsBay').html(domString);
};

const friendsList = (friendsArr) =>
{
  let domString = '';
  friendsArr.forEach(user =>
  {
    domString += `<div class="col-md-100 friendCard">`;
    domString += `<div class="panel panel-default">`;
    domString += `<div class="panel-body friendCard">`;
    domString += `<h3 data-friendUid="${user.uid}">${user.username} `;
    if (user.isPending = true)
    {
      domString += `<span class="label label-primary">Pending</span>`;
    }
    domString += `</h3>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
  });
  $('#myFriendsList').html(domString);
};

module.exports =
{
  domStringBuild,
  friendsList,
};
