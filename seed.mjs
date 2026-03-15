import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
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
  await registerUser(process.env.ADMIN_EMAIL || "admin@example.com", process.env.ADMIN_PASSWORD || "admin123", "Admin", "Unnat Admin");
  
  console.log("Creating user...");
  await registerUser(process.env.USER_EMAIL || "user@example.com", process.env.USER_PASSWORD || "user123", "Citizen", "Unnat Citizen");
  
  process.exit(0);
}

run();
