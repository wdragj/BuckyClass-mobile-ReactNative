import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBwtB1KBpP0pHINacPycXI_GEtVQukaCd4",
    authDomain: "grow-madison.firebaseapp.com",
    databaseURL: "https://grow-madison-default-rtdb.firebaseio.com",
    projectId: "grow-madison",
    storageBucket: "grow-madison.firebasestorage.app",
    messagingSenderId: "574541161147",
    appId: "1:574541161147:web:11d765b84e6c66b0efbf9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const realtimeDB = getDatabase(app);

export { auth, db, storage, realtimeDB };
