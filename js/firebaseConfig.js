import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyBwliUDUiq27_KOGt84UczQct6Z8X3rsyQ",
  authDomain: "projeto-teste-8abb5.firebaseapp.com",
  databaseURL: "https://projeto-teste-8abb5-default-rtdb.firebaseio.com",
  projectId: "projeto-teste-8abb5",
  storageBucket: "projeto-teste-8abb5.firebasestorage.app",
  messagingSenderId: "650943976996",
  appId: "1:650943976996:web:fea4b31859f7ca0cf36ab1",
  measurementId: "G-JLR92CM235"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, app };
