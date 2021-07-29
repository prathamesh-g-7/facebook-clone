import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxHfahpQtU_AMnc4n42ks4mMr9P6MYHCs",
  authDomain: "facebook-clone-8d47f.firebaseapp.com",
  projectId: "facebook-clone-8d47f",
  storageBucket: "facebook-clone-8d47f.appspot.com",
  messagingSenderId: "152882857474",
  appId: "1:152882857474:web:b3e2e5424a072a50cb091b",
  measurementId: "G-PGBGFYJ96Z",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
