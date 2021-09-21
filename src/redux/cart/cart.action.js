import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
    // no need for a payload since it's toggling between hidden (True / False) based on previous state
})

// function that gets the item we want to add to empty cartitem array and we'll return an action and the item in the 'payload'
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item //this is the item we're trying to clear
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item //this is the item we're trying to remove
})

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART,
})