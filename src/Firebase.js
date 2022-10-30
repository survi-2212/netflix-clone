import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAmqlnSWiHxRYSK85_8ARZl5bs7qprm_6A",
  authDomain: "netflix-clone-app-5dd30.firebaseapp.com",
  projectId: "netflix-clone-app-5dd30",
  storageBucket: "netflix-clone-app-5dd30.appspot.com",
  messagingSenderId: "237627587269",
  appId: "1:237627587269:web:cef5a6f899ce6b58630eac",
  measurementId: "G-ZYW2JD4FQ0",
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = getFirestore(app);
export default app;
