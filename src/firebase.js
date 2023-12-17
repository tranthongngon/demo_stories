// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
  
};

const firebaseConfig1 = {

};


// Initialize Firebase
const app1 = initializeApp(firebaseConfig1, 'stories');
const dbs = getFirestore(app1);


// Initialize Firebase
const app2 = initializeApp(firebaseConfig2, 'image');
const storage = getStorage(app2);

export {
 storage,
 dbs
}