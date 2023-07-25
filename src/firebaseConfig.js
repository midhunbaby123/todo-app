import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD_5ummnKm1vnsHScdGIPf76ifaIaXEQTs",
    authDomain: "todo-9a362.firebaseapp.com",
    projectId: "todo-9a362",
    storageBucket: "todo-9a362.appspot.com",
    messagingSenderId: "526813079512",
    appId: "1:526813079512:web:768aa2cb671f4d94edf4ad",
    measurementId: "G-LYXFE4JT6M"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;
