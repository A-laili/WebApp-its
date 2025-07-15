// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";

// Your Firebase config object (from Firebase Console → Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyDX-AIzaSyBX_HnhCHMPOJEJYbiP_JFiKCCBni438iU", // Replace with your actual API key
  authDomain: "its-app-466013.firebaseapp.com",
  projectId: "its-app-466013",
  storageBucket: "its-app-466013.appspot.com",
  messagingSenderId: "247666347106",
  appId: "1:247666347106:web:exampleappidvalue", // Replace this with your real App ID if needed
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth service
const auth = getAuth(app);

// Setup OAuth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Export everything you need
export { auth, googleProvider, githubProvider, signInWithPopup };
