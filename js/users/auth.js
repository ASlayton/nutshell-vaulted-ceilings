const {checkFriendRequest, setMyUsername,} = require('../friends/friendsEvents');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').addClass('hide');
      $('#messages').addClass('hide');
      $('#welcome, #logout').removeClass('hide');
<<<<<<< HEAD
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
      checkFriendRequest();
      setMyUsername();
=======
      $('#users, #events, #tasks, #messages, #friends').addClass('hide');
>>>>>>> master
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
