import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.action'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

const CartIcon = ({toggleCartHidden}) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>0</span>
  </div>

)

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
  // we are using this function to "map" state to the CartIcon component via "connect" which is a higher order component
  // toggleCartHidden is the name we're passing to reference the toggleCartHidden() function we declared in our cart.action.js
  // so this essentially maps a function that triggers 'onClick'
})

export default connect(null, mapDispatchToProps)(CartIcon);