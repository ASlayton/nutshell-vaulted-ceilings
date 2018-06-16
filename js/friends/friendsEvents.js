const {getAllUsers, addAFriend, getAllFriends,} = require('./friendsCrud');
const {domStringBuild, friendsList,} = require('./friendsDom');;
let friendUid = '';

$('#friendsBtn').click(() =>
{
  $('#friends').removeClass('hide');
  $('#welcome').addClass('hide');
  $('#backBtn').removeClass('hide');
});

// Checks if the users are already on your friends list

const isFriends = (userObj) =>
{
  return userObj.uid === friendUid;
};

// Show A List Of Friends You Can Add

const getNonFriends = () =>
{
  getAllUsers()
    .then((addableUsers) =>
    {
      getAllFriends()
        .then((myFriendsList) =>
        {
          myFriendsList.forEach(friend =>
          {
            friendUid = friend.friendUid;
            if (addableUsers.findIndex(isFriends) !== -1)
            {
              addableUsers = addableUsers.filter(user => user.uid !== friend.friendUid);
            }
          });
          domStringBuild(addableUsers);
        });
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

const getAllUsersEvent = () =>
{
  $('#getFriendsBtn').click(() =>
  {
    getNonFriends();
  });
};

// Adding a friend

const addAFriendEvent = () =>
{
  $(document).on('click', '.addThisFriend', (e) =>
  {
    const friendToAddCard = $(e.target).closest('.userCard');
    const friendUid = friendToAddCard.find('h3').data('frienduid');
    const friendToAdd =
    {
      'username': friendToAddCard.find('h3').text(),
      'friendUid': friendUid,
      'isAccepted': false,
      'isPending': true,
    };
    addAFriend(friendToAdd).then()
      .catch((err) =>
      {
        console.error('Error in adding a friend', err);
      });
    getNonFriends();
  });
};

// Show A list of your friends

const showMyFriends = () =>
{
  $(document).click(() =>
  {
    getAllFriends()
      .then((result) =>
      {
        friendsList(result);
      })
      .catch((err) =>
      {
        console.error(err);
      });
  });
};

const initEvents = () =>
{
  getAllUsersEvent();
  addAFriendEvent();
  showMyFriends();
};

module.exports =
{
  initEvents,
};
