const {getUsers, saveNewUser,} = require('./firebaseApi');

const authorizationEvents = () => {
  $('#go-register').click(() => {
    $('#register-form').removeClass('hide');
    $('#login-form').addClass('hide');
  });

  $('#go-login').click(() => {
    $('#register-form').addClass('hide');
    $('#login-form').removeClass('hide');
  });

  $('#register-btn').click(() => {
    const userEmail = $('#registerEmail').val();
    const userPassword = $('#registerPassword').val();
    const userName = $('#registerUsername').val();
    let userMatch = false;
    getUsers()
      .then((arrayOfUsers) => {
        arrayOfUsers.forEach((user) => {
          if (user.username === userName) {
            alert('This username already exists. Please choose another username.');
            userMatch = true;
          }
        });
        if (!userMatch) {
          firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then((createdUser) => {
              const newUser = {
                username: userName,
                uid: createdUser.user.uid,
              };
              saveNewUser(newUser)
                .then(() => {
                  $('#auth').addClass('hide');
                  $('#welcome, #logout').removeClass('hide');
                  $('#users, #events, #tasks, #friends, #messages').addClass('hide');
                });
            })
            .catch((error) => {
              $('#register-error-msg').text(error.message);
              $('#register-error').removeClass('hide');
              console.error(error.message);
            });
        };
      });
  });

  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hide');
        console.error(error.message);
      });
  });

  $('#logout').click(() => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        $('#auth').removeClass('hide');
        $('#welcome, #logout').addClass('hide');
        $('#users, #events, #tasks, #friends, #messages').addClass('hide');
        $('#inputPassword, #inputEmail, #registerPassword, #registerEmail, #registerUsername').val('');
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  });
};

module.exports = {
  authorizationEvents,
};
