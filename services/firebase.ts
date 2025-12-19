import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Set persistence to localStorage
setPersistence(auth, browserLocalPersistence).catch((error: any) => {
  console.error('Persistence error:', error);
});

const googleProvider = new GoogleAuthProvider();

export const authService = {
  // Email & Password
  signup: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  
  login: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  // Google OAuth
  signInWithGoogle: () => {
    return signInWithPopup(auth, googleProvider);
  },

  // Sign Out
  logout: () => {
    return signOut(auth);
  },

  // Auth State
  onAuthChange: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  }
};
