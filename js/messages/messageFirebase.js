const createMessage = (newMessage) => {
  newMessage.userUid = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `https://nutshell-vaulted.firebaseio.com/messages.json`,
      data: JSON.stringify(newMessage),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  createMessage,
};
