import firebase from 'firebase/app';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyA6rTRCUiJ1W4OwDWJzXCQStGHqFdc4V2A",
    authDomain: "project1-43b09.firebaseapp.com",
    projectId: "project1-43b09",
    storageBucket: "project1-43b09.appspot.com",
    messagingSenderId: "1055127596907",
    appId: "1:1055127596907:web:e42a95a7baf79b0cece62e",
    measurementId: "G-1QMZK6DW3Z"
  });
} else {
  firebase.app();
}

const db = firebase.firestore();
