import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZ-HBufDf5JrElikOjjVwcVxeyLRd6BzU",
  authDomain: "pantrypal-e1225.firebaseapp.com",
  projectId: "pantrypal-e1225",
  storageBucket: "pantrypal-e1225.appspot.com",
  messagingSenderId: "694619781401",
  appId: "1:694619781401:web:ec0a8b6ad6950a1a222d88",
  measurementId: "G-SW04Z59K30"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, app, db };