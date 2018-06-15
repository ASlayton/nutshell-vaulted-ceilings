const {checkFriendRequest,} = require('./friends/friendsEvents');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').addClass('hide');
      $('#welcome, #logout').removeClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
      checkFriendRequest();
    } else {
      $('#auth').removeClass('hide');
      $('#welcome, #logout').addClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
    };
  });
};

module.exports = {
  checkUserLoginStatus,
};
