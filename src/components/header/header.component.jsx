import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './header.styles.scss'

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-containter" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/contact">CONTACT</Link>
            <div>
                {
                    currentUser ? 
                    (<div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>) :
                    (<Link className="option"  to='/signin'>
                        SIGN IN
                    </Link>)
                }
            </div>
            <CartIcon />
        </div>
        {hidden ? null: <CartDropdown />}
    </div>
);

// mapStateToProps passes the state we're receivign from global store as a 'prop' to the component we're calling.
// "user" and "cart" are coming from our slices (different) states passed into root-reducer.js (see the file). The root-reducer which is passed into store.js which is the stored state data that's passed into the "Provider" component in index.js so our components can experct "user" and "cart" exactly since the component wrapping them (Provider) has the "store" prop that is going to be passed into whatever component we're calling. Still weird but close! 
// OR state.user.CurrentUser and state.cart.hidden if you didn't destructure this way.
// "state" comes from the store
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
    // currentUser: state.user.currentUser //so we go into our root reducer "state.user" then our user reducer ".currentUser" which in turn is action.payload in user.reducer.js. It will return null at first for us before state changes to current user upon sign in; 
});

// connect allows us to pass in state from reducer
// connect is a 'higher order component' which is a component that takes in a function and a component as arguments and transforms that component using that function. 
export default connect(mapStateToProps)(Header);
// "connect" here has two fxns that first executes an inner function with the parameter (mapStateToProps) which returns value of currentUser then it returns the outer function which takes the value of the inner function (currentUser) and passes it INTO the parameter / "props" of the outer function, e.g. Header, which is our Header component which receives the state of our currentUser. Now we can remove "this.state.currentUser" from the the Header component because we pass it directly in this file / component, by accessing it from our root & user reducer (combined reducers or combineReducers), before we export it to App.js. Phew!