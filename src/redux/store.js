import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer'

// From Dan (Teaching Assistant): https://bit.ly/37IfIcj
/*
I prefer using redux dev tools (chrome extension) so 
I am setting that up here. This is optional. If you 
prefer redux dev tools, go ahead and copy this as well
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middlewares = [logger];

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
//   console.log('REACT_APP_ENVIRONMENT => ', process.env.NODE_ENV);
}

// Per Dan (Teaching Assistant - see Git Repo link above): compose enhancers is optional for redux dev tools

// From here: https://redux.js.org/api/store
// "A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it."
// const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );


// Refactoring: Let's store this in localstorage for persistence of our  state.

export const persistor  = persistStore(store);

// export default store;
// export {store, persistor};