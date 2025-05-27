import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDj91w3hAdzU8yqEBUcsHEBm11ZEvPO20o",
  authDomain: "project-x-61109.firebaseapp.com",
  projectId: "project-x-61109",
  storageBucket: "project-x-61109.appspot.com",
  messagingSenderId: "1093389762401",
  appId: "1:1093389762401:web:5218137cc20267fc44cf20",
  measurementId: "G-KR8VNN4YFJ",
}

console.log("Initializing Firebase with config:", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig)
console.log("Firebase app initialized");

// Initialize Firestore with offline settings
export const db = getFirestore(app)
console.log("Firestore initialized");

// Initialize Auth
export const auth = getAuth(app)
console.log("Auth initialized");

// Initialize Analytics only in browser
export const analytics =
  typeof window !== "undefined"
    ? import("firebase/analytics").then(({ getAnalytics }) => getAnalytics(app)).catch(() => null)
    : null

export default app
