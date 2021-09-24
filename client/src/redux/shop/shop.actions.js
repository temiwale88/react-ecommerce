import ShopActionTypes from './shop.types'
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// })


// Redux-Thunk: Lecture 188. ALLOWS us to handle asynchronous activity inside of our action instead of the component
/* 
Lecturer:
All thunks are is a action creator that returns a function that gets the dispatch very similar to mapDispatchToProps.
Instead of creating an action that returns an action object,...we're going to write a function that returns a function that gets dispatch in it so that whenever dispatch is called, it'll fire multiple actions.
*/
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
    // payload: collectionsMap //no payload since it only just changes our boolean 'isFetching'
})

/*
fetchCollectionsStartAsync: This is going to be the actual function that we pass into our components to begin this process...
So what we're doing is we're dispatching the moment this function gets called, 'fetchCollectionsStartAsync', gets called the moment we call that function.
Redux is going to then go through this function, it's going to instantiate this ('dispatch') function (within the 'fetchCollectionsStartAsync' fxn) the moment we call this in our application code.
What's going to happen is it's going to create the collectionRef and then it's going to dispatch the action 'fetchCollectionStart' (above), which will switch our state 'isFetching' to true.
And then it's going to begin this asynchronous request (collectionRef.get().then()).
It's going to go out, fetch the code right from our back end.
[Then] It's going to come back.
We're going to build our collectionsMap and then we are going to make a fetchCollectionsSuccess call.

...But all [redux-thunk does here] is just that we now are able to return this (dispatch) function, which can now dispatch multiple actions, which in turn allows us to now handle asynchronous activity inside of an action instead of our component. So if we have multiple components that possibly need this SHOP data, they can just fire the action and then all the other components don't even have to worry because the data will now be stored inside of our reducer and we don't have to rewrite that code.

Andrei - Lecture 189 - What does Redux Thunk Do?
...Redux Thunk allows us to catch the action and it's only going to detect actions that aren't objects.

*/

export const fetchCollectionsStartAsync = () => {
    // we're returning a function ('dispatch') that does the following:
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        collectionRef.get().then(            
            snapshot => {
            // console.log(snapshot)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log(collectionsMap)
            dispatch(fetchCollectionsSuccess(collectionsMap))
            // this.setState({loading: false})
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}

/* 
And this is where we're going to get our collectionsMap and return what we had, very similar to our earlier updateCollections action, except this time it's going to be collections success. And as we remember in our reducer, this is where we put in the payload of our collections.
*/

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})