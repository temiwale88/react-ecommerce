import React from 'react';
import './cart-item.styles.scss'

// destructure "item" properties we need from state
const CartItem = ({item: { imageUrl, price, name, quantity}}) => (
    <div className="cart-item">
        <img src={imageUrl} alt='item'/>
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price} </span>
            {/* ${} dollar sign here is not javascript but a styling option to show that this is in dollars*/}
        </div>
    </div>
)

export default CartItem;