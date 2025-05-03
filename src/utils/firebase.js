
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-422e1.firebaseapp.com",
  projectId: "netflix-422e1",
  storageBucket: "netflix-422e1.firebasestorage.app",
  messagingSenderId: "465735915774",
  appId: "1:465735915774:web:3d4da10ca6a43c54ddadaf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
