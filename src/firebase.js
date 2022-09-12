import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyB4FsWIhOrtfy6RBcXq393JHEWBuTkZ1FQ",
    authDomain: "instagram-clone-28d27.firebaseapp.com",
    projectId: "instagram-clone-28d27",
    storageBucket: "instagram-clone-28d27.appspot.com",
    messagingSenderId: "1067913801877",
    appId: "1:1067913801877:web:18778e5b7b091c97f16b9c"
});
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};
//   export default 
