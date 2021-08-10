import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from '../src/firebase/firebase.utils';

class App extends Component {

  // We don't need the following anymore due to mapdispatchtoprop from redux below
  // constructor(props) {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  // But we will also close the open subscription to listening in for that user's signin or sign out state which we get from firebase
  // when we unmount the component? (lecture 96 - Google Auth lecture)

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    // We will get current user and user state from firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth) {
        // see lecture 104: checking if our db has updated with the user data

        // firebase api call for current user
        const userRef = await createUserProfileDocument(userAuth);

        //Firebase concepts: snapshot gives us actual data vs. reference to that data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data() // equals action.payload
          })

          // See lecture 118 (mapDispatchToProps) on why we no longer need "this.setState" hint: redux and user.actions.js file 

          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // });
          // }, () =>  {console.log(this.state)});
          // console.log(snapShot)
          // console.log(snapShot.data())
          // console.log(this.state)
        })
      } else {
        setCurrentUser(userAuth);
        // this.setState({currentUser: userAuth}) //sets to null if user logs out (or not in db?)
      }

      // createUserProfileDocument(userAuth) 
      // this.setState({currentUser: userAuth})

      // console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //closes the subscription
  }


  render() {
    return (
      <div>
        <Header/> 
        {/* Header exists outside of the Switch, like the footer, so we have it regargless of what page we're in */}
        {/* Also, we're passing currentUser into Header because it has our 'sign out' link */}
        <Switch>
          <Route exact path ='/' component={HomePage} />
          <Route exact path ='/shop' component={ShopPage} />
          <Route exact path ='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )  
  }
}

// map "dispatch" to props of my App component
const mapDispatchToProps = dispatch => ({
  // setCurrentUser is from user.actions
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
