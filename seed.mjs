import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeHnDN52YGFf3vpO7T80nnJY7gLBGNuGM",
  authDomain: "project-unnat-web-2026.firebaseapp.com",
  projectId: "project-unnat-web-2026",
  storageBucket: "project-unnat-web-2026.firebasestorage.app",
  messagingSenderId: "901529621779",
  appId: "1:901529621779:web:85aa396daf50eb657db6e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function registerUser(email, password, role, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      role
    });
    console.log(`Successfully created ${role} user: ${email}`);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`User ${email} already exists.`);
    } else {
      console.error(`Error creating ${email}:`, error.message);
    }
  }
}

async function run() {
  console.log("Creating admin...");
  await registerUser("admin@gmail.com", "17121712", "Admin", "Unnat Admin");
  
  console.log("Creating user...");
  await registerUser("user@gmail.com", "17121712", "Citizen", "Unnat Citizen");
  
  process.exit(0);
}

run();
