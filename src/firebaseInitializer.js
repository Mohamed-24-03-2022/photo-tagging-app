import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDocs, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC-349-bSC5O-Rlng2Qhf86f4_Yi3TKHkg',
  authDomain: 'photo-tagging-app-06062023.firebaseapp.com',
  projectId: 'photo-tagging-app-06062023',
  storageBucket: 'photo-tagging-app-06062023.appspot.com',
  messagingSenderId: '844471087712',
  appId: '1:844471087712:web:3c5cc08c85d295bbc74905',
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

const querySnapshot = await getDocs(collection(db, 'charactersCoordinates'))

if (!querySnapshot.docs.length) {
  await setDoc(doc(db, 'charactersCoordinates', 'owl'), { x1: 10, y1: 90, x2: 80, y2: 200 });
  await setDoc(doc(db, 'charactersCoordinates', 'babyYoda'), { x1: 50, y1: 850, x2: 150, y2: 950 });
  await setDoc(doc(db, 'charactersCoordinates', 'alpha'), { x1: 840, y1: 850, x2: 1000, y2: 970 });
  await setDoc(doc(db, 'charactersCoordinates', 'billAndTed'), { x1: 75, y1: 1350, x2: 270, y2: 1500 });
  await setDoc(doc(db, 'charactersCoordinates', 'astroBoy'), { x1: 260, y1: 1250, x2: 300, y2: 1350 });
}


export default firebase;
export { db };
