import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBNh8bsACFkSH3arxhCl8P36GoWLPsSoxs",
  authDomain: "projectopia-86c62.firebaseapp.com",
  projectId: "projectopia-86c62",
  storageBucket: "projectopia-86c62.appspot.com",
  messagingSenderId: "666314080253",
  appId: "1:666314080253:web:acecb2b25ef7197abb6394"
};



// initialize firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);


//initialize services
const projectopiadb = firebase.firestore();
const projectopiaauth = firebase.auth();
const projectopiastorage = firebase.storage();

//setup timestamp
const timestamp = firebase.firestore.Timestamp

export { projectopiadb, projectopiaauth, timestamp, projectopiastorage };