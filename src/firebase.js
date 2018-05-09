import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyASziEYwx8auNaAiyBfLL6fn7LG4QWHqQE",
    authDomain: "forms-test-4b13c.firebaseapp.com",
    databaseURL: "https://forms-test-4b13c.firebaseio.com",
    projectId: "forms-test-4b13c",
    storageBucket: "forms-test-4b13c.appspot.com",
    messagingSenderId: "697401960246"
  };
  firebase.initializeApp(config);

const firebaseDB = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    firebaseDB,
    googleAuth
}