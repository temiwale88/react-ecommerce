import UserActionTypes from "./user.types";
// To store the user reducer
const INITIAL_STATE = {
    currentUser: null,
    error: null
  }

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state, //everything on the state i.e. from userAuth
                currentUser: action.payload,
                error: null //clear error if it succeeds in case the user tries again, succeeds after initially getting an error
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state, //everything on the state i.e. from userAuth
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;