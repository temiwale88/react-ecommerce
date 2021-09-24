import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from './user.actions';

/*
Plan of action: we will listen for 'googlesigninstart' action then we will trigger sign in from saga
*/

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get()
        // const userRef = yield auth.signInWithPopup(googleProvider)
        // console.log(userRef);

        // 'put' is similar to 'dispatch'
        yield put(signInSuccess({id: userSnapshot, ...userSnapshot.data()}))
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    // we will keep try catch here also (though we have one from getSnapshotFromUserAuth) because our signInWithPopup or signInWithEmail might fail
    try {        
        // destructure the 'user' object from results
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)

    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
        
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return; //if userAuth is null then return out of function
        } else {
            yield getSnapshotFromUserAuth(userAuth);
        }

    } catch(error) {
        yield put(signInFailure(error))
    }

}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

// We will destructure off the payload, email, password and displayname, from the signUpStart in our user.actions.js
// See Farhan's code for a different approach (without signupsuccess): https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15237378#questions/13174236
export function* signUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user:user, additionalData: {displayName}}))
    } catch(error) {
        yield put(signUpFailure(error))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

// payload coming from signUpSuccess return in 'signUp' saga above
export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)])
}