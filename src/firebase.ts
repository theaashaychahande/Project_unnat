import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeHnDN52YGFf3vpO7T80nnJY7gLBGNuGM",
  authDomain: "project-unnat-web-2026.firebaseapp.com",
  projectId: "project-unnat-web-2026",
  storageBucket: "project-unnat-web-2026.firebasestorage.app",
  messagingSenderId: "901529621779",
  appId: "1:901529621779:web:85aa396daf50eb657db6e6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
