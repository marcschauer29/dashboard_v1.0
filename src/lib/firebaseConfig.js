import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6rTRCUiJ1W4OwDWJzXCQStGHqFdc4V2A",
    authDomain: "project1-43b09.firebaseapp.com",
    projectId: "project1-43b09",
    storageBucket: "project1-43b09.appspot.com",
    messagingSenderId: "1055127596907",
    appId: "1:1055127596907:web:14cb63db91b4aa1dece62e",
    measurementId: "G-0C0BBT1QC5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export default db;
