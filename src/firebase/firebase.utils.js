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


// create user document in our nosql db (firebase)
// Make this asynchronous because it's an API call
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return null;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get() //API call so we await

    // If the user, per the snapshot, does not exist
    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        // Then create a new user with the additional data we pass in
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error)
        }

        // We will also store this user in the state of our app in App.js
    }

    // console.log(firestore.doc(`users/${userAuth.uid}`))
    // console.log(snapShot)

    // Also give us the user reference for other uses in our application
    return userRef;

}

// firebase.initializeApp(config);

// Following is from student Saurav: questions/14015094
if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }else {
    firebase.app(); // if already initialized, use that one
  }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;