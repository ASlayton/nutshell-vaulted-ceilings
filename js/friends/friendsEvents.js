const {getAllUsers, addAFriend, getAllFriends, getFriendRequests, updateFriendsDb, deleteAFriend,} = require('./friendsCrud');
const {domStringBuild, friendsList, friendRequestCard,} = require('./friendsDom');;
let friendUid = '';

$('#friendsBtn').click(() =>
{
  $('#friends').removeClass('hide');
  $('#welcome').addClass('hide');
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

// Remove A Friend From Your Friends List

const removeFriend = () =>
{
  $(document).on('click', '.rmvFriend', (e) =>
  {
    const friendId = $(e.target).closest('.friendCard').data('firebaseid');
    deleteAFriend(friendId)
      .then(() => { showFriends(); })
      .catch((err) => { console.error(err); });
  });
};

// New Friend Request Indication

const checkFriendRequest = () =>
{
  getFriendRequests()
    .then((results) =>
    {
      const pending = results.length;
      if (pending !== 0)
      {
        $('#friendsBtn').append(`<span class="badge">${pending}</span>`);
      };
    })
    .catch();
};

// Update Your Friends List

const updateFriendsList = () =>
{
  $(document).on('click', '.acceptMe', (e) =>
  {
    const friendToUpdateCard = $(e.target).closest('.friendCard');
    const friendUid = friendToUpdateCard.find('h3').data('frienduid');
    const friendId = $(e.target).closest('.friendRequestCard').data('firebaseid');
    const updatedFriend =
    {
      'username': friendToUpdateCard.find('h3').text(),
      'friendUid': friendUid,
      'isAccepted': true,
      'isPending': false,
    };
    updateFriendsDb(updatedFriend, friendId)
      .then(() => { showFriends(); })
      .catch((err) => { console.error(err); });
  });
};

// Show A list of your friends
const showFriends = () =>
{
  getAllFriends()
    .then((result) =>
    {
      console.log(result);
      getFriendRequests()
        .then((friendRequests) =>
        {
          friendsList(result);
          friendRequestCard(friendRequests);
        });
    })
    .catch((err) =>
    {
      console.error(err);
    });
};

const showMyFriends = () =>
{
  $('#showFriendsBtn').click(() =>
  {
    showFriends();
  });
};

const initEvents = () =>
{
  getAllUsersEvent();
  addAFriendEvent();
  showMyFriends();
  updateFriendsList();
  removeFriend();
};

module.exports =
{
  initEvents,
  checkFriendRequest,
};
