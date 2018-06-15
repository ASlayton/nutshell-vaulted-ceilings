let firebaseConfig = {};
let uid = '';

const setConfig = (fbconfig) => {
  firebaseConfig = fbconfig;
};

const getConfig = () => {
  return firebaseConfig;
};

const setUid = (newUserId) => {
  uid = newUserId;
};

const getUid = () => {
  return uid;
};

module.exports = {
  setConfig,
  getConfig,
  setUid,
  getUid,
  uid,
  firebaseConfig,
};
