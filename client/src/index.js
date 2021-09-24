import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


/*
See 15162908#questions/12840499 to see response from Dan to me on how the state is now accessed, with Redux implementation, by our components. It's the "Provider" and "connect()"!

Dan: 
"it is both. Provider "provides" the store to all the children components by being placed as the root component in the component tree. Connect allows us to use the store state in any component we want directly."
*/

ReactDOM.render(
  <Provider store={store}>
      <Router>
      <React.StrictMode>
        {/* persistgate receives the store from <Provider/> component and fires up actions to 'rehydrate' the state when application refreshes  */}
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
      </Router>
    </Provider>,
  document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
