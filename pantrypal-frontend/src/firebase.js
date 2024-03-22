import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage ,getDownloadURL,ref} from "firebase/storage";


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
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app); 

const USERS_COLLECTION = 'users'

async function getUserInfoFromID (uid) {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const docSnap = await getDoc(docRef);
console.log(docSnap.data())
  return docSnap.data();
}

export { auth, app, db ,storage, getUserInfoFromID};

