import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component'
import {addItem} from '../../redux/cart/cart.action'
import './collection-item.styles.scss'


const CollectionItem = ({item, addItem}) => {
    const {name, price, imageUrl} = item;

    return (
    <div className = 'collection-item'>
        <div className='image'
            style = {{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButton onClick={() => addItem(item)} inverted> Add to cart</CustomButton>
    </div>
    )
};


// "dispatch" is us "dispatching" an action (e.g. addItem action) which is the only way to trigger a state change? https://redux.js.org/api/store

/*
"See lecture 124: Cart Item Reducer - transcript
This (mapDispatchToProps) function that gets a dispatch.
And what we'll say is that whenever there's an item, it will get an item in as the property of this function that will represent the add item prop that gets passed in (to the component above).
And then we will dispatch our add item action creator passing the item in.
...
Is we are simply creating this new function that's a prop called 'add item' that will go into our collection
item as the add item function that we need to leverage.
And then what we do is whenever we actually dispatch or call this function, this function will receive the item as the property, pass it into our add item action creator, which gives us back that object where the type is equal to additem and the payload is equal to the item that got passed in.
And then we will dispatch that new object into our store and it'll go through our redux flow."
*/

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

// We're not mapping state to props (mapStateToProps) thus the first value is "null". Because each collection item isn't receiving a state (it's stateless) but is indeed changing a state by dispatching an action that changes state (adds that item). We do so by clicking the "Add To Cart" button by mapping our "addItem" fxn created in the mapDispatchToProps function above into the onClick function in the "Add To Cart" button.
// On "action": Sometimes actions have a "payload", or data we want to send to state (e.g. items to be added), and sometimes they don't e.g. "hidden" value for showing cart icon / dropdown. But that's also sent to our state i.e. in the "store.js"
export default connect(null, mapDispatchToProps)(CollectionItem);