// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBX_HnhCHMPOJEJYbiP_JFiKCCBni438iU",
  authDomain: "its-app-a2d3d.firebaseapp.com",
  projectId: "its-app-a2d3d",
  storageBucket: "its-app-a2d3d.appspot.com", // fixed `.app` → `.appspot.com`
  messagingSenderId: "454185580863",
  appId: "1:454185580863:web:2b2f392fa3f300c9c4bb8a",
  measurementId: "G-FYXXEJGV2Q",
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Init Analytics (optional)
const analytics = getAnalytics(app);

// ✅ Init Auth & Providers
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ✅ Export what's needed for login
export { auth, googleProvider, githubProvider, signInWithPopup };
