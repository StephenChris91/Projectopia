import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyChCs4P_8_yI9O4CN9n9JXia6iazilw6wk",
    authDomain: "projectopia-f2537.firebaseapp.com",
    projectId: "projectopia-f2537",
    storageBucket: "projectopia-f2537.appspot.com",
    messagingSenderId: "804645985616",
    appId: "1:804645985616:web:e193bf4c70479007fd6055"
  };



// initialize firebase
firebase.initializeApp(firebaseConfig);


//initialize services
const projectopiadb = firebase.firestore();
const projectopiaauth = firebase.auth();

//setup timestamp
const timestamp = firebase.firestore.Timestamp

export { projectopiadb, projectopiaauth, timestamp };