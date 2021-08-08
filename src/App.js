import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth} from '../src/firebase/firebase.utils';

class App extends Component {

  constructor(props) {
    super();

    this.state = {
      currentUser: null
    }
  }

  // But we will also close the open subscription to listening in for that user's signin or sign out state which we get from firebase
  // when we unmount the component? (lecture 96 - Google Auth lecture)

  unsubscribeFromAuth = null;

  componentDidMount() {
    // We will get current user and user state from firebase
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => { 
      this.setState({currentUser: user})

      // console.log(user);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //closes the subscription
  }


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/> 
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

export default App;
