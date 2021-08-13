import React from 'react';

import {connect} from 'react-redux';
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss'


const CartDropdown = ({cartItems}) => (
    // console.log(cartItems)
    // return null
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} item={cartItem} />
                )
            }
        <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    </div>

)

// we're pulling this off of state which is updated by our cartReducer once this action has been identified: CartActionTypes.ADD_ITEM. The state is updated in our rootreducer which passes to to the store.

// const mapStateToProps = (state) =>({
//     cartItems: state.cart.cartItems,
// })

// OR desctructuring explicitly
// const mapStateToProps = ({cart}) =>({
//     cartItems: cart.cartItems,
// })

//OR by destructuring even more explicitly especially in the case
// you have multiple state slices to destructure. 
const mapStateToProps = ({cart: {cartItems}}) =>({
    cartItems,
})

// In this case, we're calling the 'cartItems' value which is the returned value from the 'cartReducer' that is referenced in the object named "cart" in the root-reducer. The curly braces around {cartItems} is us saying we want to 'pull' that value or destructure it from the cart object. Further, 'cartItems' is now mapped to props, from the global redux managed-state, via connect to the cart-dropdown component.


// Connect here passes state.CartItems (a slice of our state) from our store (see cartReducer which action = CartActionTypes.ADD_ITEM), which is pulled / returned (with curly braces {} declared as automatic return) by our mapStateToProps - the inner - function, TO our cart-dropdown component - the outer function which is return the existing component with state "mapped" to the component as a property.
export default connect(mapStateToProps)(CartDropdown);