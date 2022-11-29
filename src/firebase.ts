import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3rohJob3gY_yJF3GyAa7Zdg83OJr3vZo",
    authDomain: "todolist-f02b5.firebaseapp.com",
    projectId: "todolist-f02b5",
    storageBucket: "todolist-f02b5.appspot.com",
    messagingSenderId: "482177456524",
    appId: "1:482177456524:web:c14350edf27e56fc0c5ea9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}