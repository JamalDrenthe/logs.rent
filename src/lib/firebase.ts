import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQzgK086zbkKE4_SblEGKU8EqkxADyTg8",
  authDomain: "logs-rent-dev.firebaseapp.com",
  projectId: "logs-rent-dev",
  storageBucket: "logs-rent-dev.firebasestorage.app",
  messagingSenderId: "457788654642",
  appId: "1:457788654642:web:fce88c9bf4f24ac9c1e82b"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force account picker if user clicks Google sign in
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
