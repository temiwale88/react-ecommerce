import CartActionTypes from "./cart.types";
import {addItemToCart, removeItemFromCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
}

// These return something based on the "action" we're "dispatching"
const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state, //this is not changing but 'state.cart.hidden' state below
                hidden: !state.hidden //dynamically converts to opposite value of TOGGLE_CART_HIDDEN
            };
        case CartActionTypes.ADD_ITEM:
            return{
                ...state, 
                cartItems: addItemToCart(state.cartItems, action.payload) //this is so we return a quantity and action.payload is the new item we're adding which is evaluated as 'new' or if exists in the cart array of items, added to existing 'like' item. 
                
                // cartItems: [...state.cartItems, action.payload]
                // see lecture 124 - Cart Item Reducer
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id) //see lecture 139 Remove Items From Cart
            }
        case CartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)//see lecture 140 Remove Items At Checkout
            }
        case CartActionTypes.CLEAR_CART:
            return{
                ...state,
                cartItems: []
            }
            
        default:
            return state;
    }
}

export default cartReducer;
// this is added to the root reducer so the state goes 'global'!