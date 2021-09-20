import {takeLatest, put, all, call} from 'redux-saga/effects';
import UserActionTypes from './user.types'
import {auth, googleProvider, createUserProfileDocument} from '../../firebase/firebase.utils'
import { signInSuccess, signInFailure} from './user.actions';

/*
Plan of action: we will listen for 'googlesigninstart' action then we will trigger sign in from saga
*/

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
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

export function * onGoogleSignInStart() {
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

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)])
}