// Represents all the state of the application - code that combines all our states together

import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';


export default combineReducers({
    user: userReducer,
})