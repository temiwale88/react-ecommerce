import { UserActionTypes } from "./user.types";
// To store the user reducer
const INITIAL_STATE = {
    currentUser: null
  }

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, //everything on the state i.e. from userAuth
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;