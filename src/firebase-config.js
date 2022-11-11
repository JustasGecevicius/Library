const config = {
    apiKey: "AIzaSyAM_G5prWp1HEBLsomC971I24rLuDqLojE",
    authDomain: "friendlychat-75bfb.firebaseapp.com",
    projectId: "friendlychat-75bfb",
    storageBucket: "friendlychat-75bfb.appspot.com",
    messagingSenderId: "899021265522",
    appId: "1:899021265522:web:79cbe35aeda279545fc0eb"
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }

  