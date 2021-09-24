// See here to understand: https://www.eternussolutions.com/2020/12/21/redux-thunk-redux-saga/

import {takeLatest, call, put, all} from 'redux-saga/effects';
import ShopActionTypes from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'


export function* fetchCollectionsAsync(){
    // yield console.log("I am fired")
    
        try {
            const collectionRef = firestore.collection('collections');
            const snapshot = yield collectionRef.get();
            const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
            // 'call' invokes a function unlike below. it allows us to use yield and thus let saga take control of what to do with it e.g. canceling it etc.
            // const collectionsMap = convertCollectionsSnapshotToMap(snapshot)

            // 'put' is similar to dispatching. here we're dispatching new actions success or failure

            // this becomes our payload for reducer on success action type
            yield put(fetchCollectionsSuccess(collectionsMap));
            // put is like 'dispatch' e.g. for thunk
        } catch (error) {

            // this becomes our payload for reducer on failure action type
            yield put(fetchCollectionsFailure(error.message))
        }
}

export function* fetchCollectionsStart() {
    // Saga that listens for the FETCH_COLLECTIONS_START action and executes our fetchCollectionsAsync saga (generator) function
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}