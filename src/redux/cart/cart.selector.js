import {createSelector} from 'reselect';

/*
See the flow, below:

get cart
    |
    v
get cartItems from cart
    |
    v
get cartItems count from cartItems

*/

// Gets the whole state but we want a slice
// pulling state.cart from reducer state
const selectCart = state => state.cart;
// This is an input selector

// Now this is memoized because of createSelector - lecture 131 (Reselect library)
export const selectCartItems = createSelector(
    [selectCart], //an array of input selectors like above in order they were written
    (cart) => cart.cartItems //cart from cart.cartItems comes from the 'selectCart' function above
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0
    )

    // cartItems from cartItems.reduce() comes from return of the function from selectCartItems which returns cartItems.
)