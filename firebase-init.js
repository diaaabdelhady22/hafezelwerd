import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, setDoc, increment, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDVFjoFTEyuqk5pc9YbkraCNKqV2c8GXUc",
  authDomain: "diaa-b5c1c.firebaseapp.com",
  projectId: "diaa-b5c1c",
  storageBucket: "diaa-b5c1c.firebasestorage.app",
  messagingSenderId: "313451144294",
  appId: "1:313451144294:web:900a47b3bb9936fc2df9a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// مستند واحد فيه العدادين: views و downloads
export const statsRef = doc(db, "stats", "hafiz-alwird");

export function hit(field) {
  return setDoc(statsRef, { [field]: increment(1) }, { merge: true }).catch(() => {});
}

export function watchStats(callback) {
  return onSnapshot(statsRef, (snap) => {
    const d = snap.exists() ? snap.data() : {};
    callback({ views: d.views || 0, downloads: d.downloads || 0 });
  }, () => callback(null));
}
