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


// Moving our shop_data to firestore  | lecturs 176 & 177 moving shop data to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    // console.log(collectionRef);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        // console.log(newDocRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit()
}
  

// lecture 179
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedcollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items

        }

    });

    // lecture 180
    return transformedcollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
    // console.log(transformedcollection)
}

// Lecture 206 - Recreating persistence - we're mimicking the behavior we will see if firebase is not our backend. We need a promise-based solution that our sagas can yield to.

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe(); //immediately unsubscribe (why??)
            resolve(userAuth);
        }, reject);
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;