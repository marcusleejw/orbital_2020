import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDODmamokM0TFDnG8KycojKnOBTOnaSv90",
    authDomain: "eatwhere-73866.firebaseapp.com",
    databaseURL: "https://eatwhere-73866.firebaseio.com",
    projectId: "eatwhere-73866",
    storageBucket: "eatwhere-73866.appspot.com",
    messagingSenderId: "365048306529",
    appId: "1:365048306529:web:b53763fc89aff8ec5f8320",
    measurementId: "G-R5BQGCWYZY"
};

firebase.initializeApp(firebaseConfig);

export default firebase;



