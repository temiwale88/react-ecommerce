import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import {useSelector, useDispatch} from 'react-redux';
// import {setCurrentUser} from './redux/user/user.actions';
// import {createStructuredSelector} from 'reselect';


import {selectCurrentUser} from './redux/user/user.selectors'
import {checkUserSession} from './redux/user/user.actions'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

// import {auth, createUserProfileDocument} from '../src/firebase/firebase.utils';

const App = () =>  {

  // using the useSelector hook vs. mapStateToProps: Lecture 223 (React-Redux Hooks)
  const currentUser = useSelector(selectCurrentUser);

  // const currentUser = useSelector((state / selectCurrentUser) => {
  //   console.log(state / selectCurrentUser)
  // });


  // using the useDispatch hook vs. mapDispatchToProps: Lecture 224 (useDispatch)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  // We don't need the following anymore due to mapdispatchtoprop from redux below
  // constructor(props) {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  // But we will also close the open subscription to listening in for that user's signin or sign out state which we get from firebase
  // when we unmount the component? (lecture 96 - Google Auth lecture)

  // unsubscribeFromAuth = null;

  // // Alternative to componentDidMount
  // useEffect(() => {
  //   checkUserSession()
  // }, [checkUserSession])

  // componentDidMount() {
  //   // this comes from userauth persistence lecture 206 "Recreating Persistence"
  //   // const {checkUserSession} = this.props;
  //   checkUserSession();

  //   // setCurrentUser here and in this component comes from mapDispatchToProps which in turn comes from our import statement from user.action. We're destructuring it with {} from "this.props" which is passed in by the mapDispatchToProps function.
  //   // const {setCurrentUser} = this.props;
  //   // We will get current user and user state from firebase
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

  //   //   if(userAuth) {
  //   //     // see lecture 104: checking if our db has updated with the user data

  //   //     // firebase api call for current user
  //   //     const userRef = await createUserProfileDocument(userAuth);

  //   //     //Firebase concepts: snapshot gives us actual data vs. reference to that data
  //   //     userRef.onSnapshot(snapShot => {
  //   //       setCurrentUser({
  //   //         id: snapShot.id,
  //   //         ...snapShot.data() // equals action.payload
  //   //       })

  //   //       // See lecture 118 (mapDispatchToProps) on why we no longer need "this.setState" hint: redux and user.actions.js file 

  //   //       // this.setState({
  //   //       //   currentUser: {
  //   //       //     id: snapShot.id,
  //   //       //     ...snapShot.data()
  //   //       //   }
  //   //       // });
  //   //       // }, () =>  {console.log(this.state)});
  //   //       // console.log(snapShot)
  //   //       // console.log(snapShot.data())
  //   //       // console.log(this.state)
  //   //     })
  //   //   } else {
  //   //     setCurrentUser(userAuth);
  //   //   }

  //   //   // this.setState({currentUser: userAuth}) //sets to null if user logs out (or not in db?)

  //   //   // createUserProfileDocument(userAuth) 
  //   //   // this.setState({currentUser: userAuth})

  //   //   // console.log(user);
  //   // })
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth(); //closes the subscription
  //   // See comment from classmate Alex #questions/10432834 on lecture 96
  //   // "unsubscribeFromAuth is initialised as null

  //   // unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged(). Yihua doesn't say this in the vid but this method returns another method: firebase.unsubscribe().

  //   // (see docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe)

  //   // so when unsubscribeFromAuth() is called inside the componentWillUnmount, it now has the value of firebase.unsubscribe(), which executes, closing the session."
  // }


  return (
    <div>
      <Header/> 
      {/* Header exists outside of the Switch, like the footer, so we have it regargless of what page we're in */}
      {/* Also, we're passing currentUser into Header because it has our 'sign out' link */}
      <Switch>
        <Route exact path ='/' component={HomePage} />
        <Route path ='/shop' component={ShopPage} />
        {/* We're not adding "exact" to the /shop Route because it's going to have nested routes e.g. shop/hats, shop/women etc. */}
        <Route exact path ='/checkout' component={CheckoutPage} />
        {/* <Route exact path ='/signin' component={SignInAndSignUpPage} /> */}
        {/* We don't want to allow a signed in user to access the sign in page so we'll redirect them. Also upon first sign in we'll get redirected to homepage...see below! */}
        <Route exact path ='/signin' render={() => 
          currentUser ? 
          (<Redirect to='/' />): (
            <SignInAndSignUpPage/>
          )} 
        />
      </Switch>
    </div>
  )  
}

// destructure our 'user' reducer by {user}
// const mapStateToProps = ({user}) =>({
//   currentUser: user.currentUser //see header.component.jsx for how we're passing in an object called 'currentUser' into the component we're transforming since "connect, which receives mapStateToProps and mapDispatchToProps functions, is a "higher order" component
// })

// AFTER re-factoring to using selectors:
// const mapStateToProps = state =>({
//   currentUser: selectCurrentUser(state)
// })

// // With createStructuredSelector
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// })

// const mapDispatchToProps = dispatch => ({
//   checkUserSession: () => dispatch(checkUserSession())
// })

// map "dispatch" to props of my App component
// We're dispatching an action here:
// const mapDispatchToProps = dispatch => ({
//   // setCurrentUser is from user.actions
//   setCurrentUser: user => dispatch(setCurrentUser(user))
//   // dispatch(setCurrentUser(user)) is the same as saying:
//   // dispatch({
//   //   type: UserActionTypes.SET_CURRENT_USER,
//   //   payload: user
//   // })
//   // setCurrentUser here comes from our import statement from user.action
// })

// export default connect(
//   mapStateToProps, //we will now have access to this.props.currentUser (in the App component?) lecture 119
//   mapDispatchToProps
// )(App);

export default App;