import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
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

// Detect if running in WebView
export const isWebView = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  return /webview/.test(ua) || 
         /wv/.test(ua) || 
         /inappbrowser/.test(ua) ||
         (/android/.test(ua) && !/chrome/.test(ua));
};

export const authService = {
  // Email & Password
  signup: (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  
  login: (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  // Google OAuth (uses redirect for WebView compatibility)
  signInWithGoogle: () => {
    return signInWithRedirect(auth, googleProvider);
  },

  // Handle redirect result (call on app mount)
  handleRedirectResult: () => {
    return getRedirectResult(auth);
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
