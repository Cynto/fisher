// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCioVa7BzTqOSKjD6nWZT9yl6dVrb-6GFE',
  authDomain: 'fisher-d459b.firebaseapp.com',
  projectId: 'fisher-d459b',
  storageBucket: 'fisher-d459b.appspot.com',
  messagingSenderId: '816066265388',
  appId: '1:816066265388:web:9358f9e4b2b406e7642c89',
  measurementId: 'G-CC4ZRPRW1S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth()