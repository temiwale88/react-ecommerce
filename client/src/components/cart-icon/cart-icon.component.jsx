import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.action'
import {selectCartItemsCount} from '../../redux/cart/cart.selectors'
import {createStructuredSelector} from 'reselect';

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

const CartIcon = ({toggleCartHidden, itemCount}) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{itemCount}</span>
      {/* {  console.log(toggleCartHidden)} */}
  </div>

)

// This is a selector but written the way it is below is not performant for our app because the component re-renders even if it's not called directly and doesn't need to.

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
  // "onClick", we're dispatching (e.g. dispatch(this.action) this action (toggles between hidden or not -> 'show') to our state 
  // toggleCartHidden is the name we're passing to reference the toggleCartHidden() function we declared in our cart.action.js
  // so this essentially maps a function that triggers on 'onClick'
})

// IMPORTANT SEE Lecture 129: Selectors in Redux. This is where we learn about "memoization", or "caching", and the "Selector" library 
// const mapStateToProps = ({cart: {cartItems}}) => ({
//   // this is a native array.reduce method
//   itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
// })

// So for re-done code logic see - cart.selector in redux folder

// const mapStateToProps = state => ({
//   itemCount: selectCartItemsCount(state),
// })

// Refactoring with selectors
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);