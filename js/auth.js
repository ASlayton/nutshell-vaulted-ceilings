const {setUid,} = require('./firebaseApi');
const {checkFriendRequest,} = require('./friends/friendsEvents');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      $('#auth').addClass('hide');
      $('#welcome, #logout').removeClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
      checkFriendRequest();
    } else {
      $('#auth').removeClass('hide');
      $('#welcome').addClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
    };
  });
};

module.exports = {
  checkUserLoginStatus,
};
