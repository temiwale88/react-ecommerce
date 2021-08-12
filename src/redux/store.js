import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer'

const middlewares = [logger];

// From here: https://redux.js.org/api/store
// "A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it."
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;