import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';

import './header.styles.scss'

const Header = ({currentUser}) => (
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
                    <div className="option" onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div> :
                    <Link className="option"  to='/signin'>
                        SIGN IN
                    </Link>
                }
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser //so we go into our root reducer "state.user" then our user reducer ".currentUser" which in turn is action.payload in user.reducer.js. It will return null at first for us before state changes; 
});

// connect allows us to pass in state from reducer
// connect is a 'higher order component' which is a component that takes in a component as argument and transforms that component. 
export default connect(mapStateToProps)(Header);
// "connect" here has two fxns that first executes an inner function with the parameter (mapStateToProps) which returns value of currentUser then it returns the outer function which takes the value of the inner function (currentUser) and passes it INTO the parameter to the outer function e.g. Header which is our Header component which receives the state of our currentUser. Now we can remove "this.state.currentUser" from the the Header component because we pass it directly in this file / component, by accessing it from our root & user reducer (combined reducers or combineReducers), before we export it to App.js. Phew!