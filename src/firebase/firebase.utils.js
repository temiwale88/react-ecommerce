import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyCsExhCLuNHFeZzyC0leaHRgKmd-JgfSK8",
    authDomain: "crown-db-4b2b0.firebaseapp.com",
    projectId: "crown-db-4b2b0",
    storageBucket: "crown-db-4b2b0.appspot.com",
    messagingSenderId: "803315838869",
    appId: "1:803315838869:web:d2ed0aa0b3e01e8110d09c",
    measurementId: "G-Q3ZGXM0M9Q"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;