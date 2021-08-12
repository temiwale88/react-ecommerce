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