// See lecture 125 for logic
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // else
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

// See lecture 140: Remove Items at Checkout
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // if the current quantity is 1, remove the whole item
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id) //we keep what is equal to cartItemToRemove.id
    }
    // else just decrement it by 1 else (": cartItem") keep every cart item the way they are 

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem)
}