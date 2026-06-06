// ============================================================
// SIIME - Configuração Firebase
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAeX57pws9oTh6AIf0lliElii8VGBZ2Gw",
  authDomain: "siime-e4ded.firebaseapp.com",
  projectId: "siime-e4ded",
  storageBucket: "siime-e4ded.firebasestorage.app",
  messagingSenderId: "662477087883",
  appId: "1:662477087883:web:360e278931403cf323e08e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);