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
    // const userName = $('#registerUsername').val();
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
      .catch((error) => {
        $('#register-error-msg').text(error.message);
        $('#register-error').removeClass('hide');
        console.error(error.message);
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
        $('#auth-link').removeClass('hide');
        $('#saved-link, #logout').addClass('hide');
        $('#zip-submit').addClass('hide');
        $('#savedForecasts').addClass('hide');
        $('#savedForecasts').html('');
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
