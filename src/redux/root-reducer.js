// Represents all the state of the application - code that combines all our states together

import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// this gets us localStorage
// import sessionStorage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['cart']
    // we're only persisting the 'cart' which comes from "export default combineReducers" below.
}

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer,
// })

// Refactoring: persisting state to our localStorage
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

/*
    Per Yihua in lecture 142:
    " 
    what we're exporting by default ...[is] this modified version of our root reducer with this persist config on top of it. So it's a modified version of our route reducer, except now with persistance capabilities, thanks to this persist reducer function that we got from Redux persist."
*/
export default persistReducer(persistConfig, rootReducer);