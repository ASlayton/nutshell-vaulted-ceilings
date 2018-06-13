const {setUid,} = require('./firebaseApi');

const checkUserLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
      $('#auth').addClass('hide');
      // $('#messages').addClass('hide'); <--UNCOMMENT THIS!
      // $('#welcome, #logout').removeClass('hide'); <--UNCOMMENT THIS!
      $('#users, #events, #tasks, #friends').addClass('hide'); // <--ADD #MESSAGES BACK!!
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
