import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDm9ZFd8HkR2UXw4RLUZ5ShmM-5BDqKl60",
  authDomain: "auth-app-d661e.firebaseapp.com",
  projectId: "auth-app-d661e",
  storageBucket: "auth-app-d661e.firebasestorage.app",
  messagingSenderId: "735925467928",
  appId: "1:735925467928:web:8a0194b2d34e3ed99dfc6d",
  measurementId: "G-9FH7PVJVH6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
