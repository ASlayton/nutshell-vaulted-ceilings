let firebaseConfig = {};
let uid = '';

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const setUid = (newUserId) => {
  uid = newUserId;
};

module.exports = {
  setConfig,
  setUid,
  uid,
  firebaseConfig,
};
