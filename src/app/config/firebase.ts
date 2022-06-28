import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC86kyt-vowdNOGqWckURd-21PpL0LmSyM",
    authDomain: "live-queue-app.firebaseapp.com",
    projectId: "live-queue-app",
    storageBucket: "live-queue-app.appspot.com",
    messagingSenderId: "229844302036",
    appId: "1:229844302036:web:e74373f938f20e602c2341"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);