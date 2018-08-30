import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBNJk_7_ff0m9tr6Vhh6yXK30KD6EDnPuw",
  authDomain: "consequences-cf53e.firebaseapp.com",
  databaseURL: "https://consequences-cf53e.firebaseio.com",
  projectId: "consequences-cf53e",
  storageBucket: "consequences-cf53e.appspot.com",
  messagingSenderId: "1034371850744"
};

export default firebase.initializeApp(config);
