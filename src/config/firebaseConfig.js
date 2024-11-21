// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUHZSTPP6cVRIsRrOuY6iYBNDDaY3qwJA",
    authDomain: "to-do-list-4f2dc.firebaseapp.com",
    projectId: "to-do-list-4f2dc",
    storageBucket: "to-do-list-4f2dc.firebasestorage.app",
    messagingSenderId: "1266245145",
    appId: "1:1266245145:web:7d07455890ea5fd3ce9488",
    measurementId: "G-S2X6Q2QWJF"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
