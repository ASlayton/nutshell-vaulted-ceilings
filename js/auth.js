const {setUid,} = require('./firebaseApi');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      $('#auth').addClass('hide');
      $('#welcome, #logout').removeClass('hide');
      $('#users, #events, #tasks, #friends, #messages').addClass('hide');
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
