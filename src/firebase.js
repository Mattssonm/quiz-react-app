import * as firebase from 'firebase';


     var config = {
        apiKey: "AIzaSyDAfMpCzeSjTkWtvSwBAnrUIRL12wz9Wbg",
        authDomain: "quiz-react-app-4412.firebaseapp.com",
        databaseURL: "https://quiz-react-app-4412.firebaseio.com",
        projectId: "quiz-react-app-4412",
        storageBucket: "quiz-react-app-4412.appspot.com",
        messagingSenderId: "237109571153"
      };
  firebase.initializeApp(config);

const firebaseDB = firebase.database();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    firebaseDB,
    googleAuth
}