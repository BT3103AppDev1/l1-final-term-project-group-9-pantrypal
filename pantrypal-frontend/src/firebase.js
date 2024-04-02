import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { getStorage, getDownloadURL, ref } from "firebase/storage";

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

const USERS_COLLECTION = 'users';

async function getUserInfoFromID (uid) {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

async function fetchCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = querySnapshot.docs.map((doc) => doc.data());
    console.log(categories.map((category) => category.category_name));
    return categories.map((category) => category.category_name);
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

export { auth, app, db, storage, getUserInfoFromID, fetchCategories };