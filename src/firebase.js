import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC-349-bSC5O-Rlng2Qhf86f4_Yi3TKHkg",
  authDomain: "photo-tagging-app-06062023.firebaseapp.com",
  projectId: "photo-tagging-app-06062023",
  storageBucket: "photo-tagging-app-06062023.appspot.com",
  messagingSenderId: "844471087712",
  appId: "1:844471087712:web:3c5cc08c85d295bbc74905"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export default firebase;
export { db };