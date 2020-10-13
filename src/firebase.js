import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDsws02OXM9MdzvWO8MUGugi36PQG_oNGY',
  authDomain: 'whatsapp-clone-75c3a.firebaseapp.com',
  databaseURL: 'https://whatsapp-clone-75c3a.firebaseio.com',
  projectId: 'whatsapp-clone-75c3a',
  storageBucket: 'whatsapp-clone-75c3a.appspot.com',
  messagingSenderId: '908683671152',
  appId: '1:908683671152:web:4aef545b3f5e38d05ee6b5',
  measurementId: 'G-TDFG9JC8QL'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
