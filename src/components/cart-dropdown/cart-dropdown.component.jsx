import React from 'react';

import {connect} from 'react-redux';
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import {toggleCartHidden} from '../../redux/cart/cart.action'

import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import './cart-dropdown.styles.scss'


const CartDropdown = ({cartItems, history, dispatch, ...otherProps}) => (
    // withRouter component is what gives us access to the "history" prop
    // console.log(cartItems)
    // console.log(otherProps)
    // return null

    // we get "dispatch" from connect because if we don't pass a second argument it passes a dispatch prop from our "otherProps". This is good for one-offs dispatches vs. writing a mapDispatchToProps function unecessarily (lecture 137 "Dispatch Action Shorthand")
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? 
                (cartItems.map(cartItem => 
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
                :
                <span className="empty-message">Your cart is empty</span>
            }
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
            }
        }>GO TO CHECKOUT</CustomButton>
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
// you have multiple state slices to destructure. Here we desctructure off cart from state then we destructure 'cartItems' from state.cart
// const mapStateToProps = ({cart: {cartItems}}) =>({
//     cartItems,
// })

// OR BETTER: after writing our selector function (memoization - lecture 131 - "Reselect library") we can pass it this way
/*
// Why from Yihua: 
"
...[T]his will make sure that our cart dropdown component is not getting re rendered whenever the state changes, that's unrelated to the cart items.

So if we sign out our cart items in our cart drop down as well as our car items count is not changing.
And therefore our cart dropdown and our cart icon component do not need to re render, which helps save us on performance.
"

But Yihua also notes: this is not always completely true because: 
"...redux's mapStateToProps has a shallow equality check for every value in the object; it won't replace values if they pass a shallow equality check which means it won't needlessly re-render, but if we have TRANSFORMATION logic it's still valuable to memoize it with a selector to save us running duplicate logic to get the same output."
see lecture 132 "Quick correction on CartIcon re-rendering"
https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/21742936#notes
*/
// const mapStateToProps = state =>({
//     cartItems: selectCartItems(state)
// })

// With createStructuredSelector
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


// In this case, we're calling the 'cartItems' value which is the returned value from the 'cartReducer' that is referenced in the object named "cart" in the root-reducer. The curly braces around {cartItems} is us saying we want to 'pull' that value or destructure it from the cart object. Further, 'cartItems' is now mapped to props, from the global redux managed-state, via connect to the cart-dropdown component.


// Connect here passes state.CartItems (a slice of our state) from our store (see cartReducer which action = CartActionTypes.ADD_ITEM), which is pulled / returned (with curly braces {} declared as automatic return) by our mapStateToProps - the inner - function, TO our cart-dropdown component - the outer function which is return the existing component with state "mapped" to the component as a property.
export default withRouter(connect(mapStateToProps)(CartDropdown));

// withRouter came during "Checkout page" lectures
// It's a higher order component that returns a "suped-up" component