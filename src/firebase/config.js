import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlN6xUZnFk1CBvHciklwnCa4146djPEEM",
  authDomain: "suryaa-book-depot.firebaseapp.com",
  projectId: "suryaa-book-depot",
  storageBucket: "suryaa-book-depot.firebasestorage.app",
  messagingSenderId: "241046417379",
  appId: "1:241046417379:web:77e365ac9fd1d569543ad6",
  measurementId: "G-6QWZCVVPNS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics is optional — only load in production
let analytics = null;
try {
  if (typeof window !== 'undefined') {
    import("firebase/analytics").then(({ getAnalytics }) => {
      analytics = getAnalytics(app);
    });
  }
} catch (e) {
  console.warn('Analytics not available:', e);
}
export { analytics };