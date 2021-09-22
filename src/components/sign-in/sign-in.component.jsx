import React, {useState} from "react"; 
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import {connect} from 'react-redux'
// import {auth, signInWithGoogle} from '../../firebase/firebase.utils'
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import './sign-in.styles.scss'

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setUserCredentials] = useState({email: '', password: ''})
    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         email: '',
    //         password: ''
    //     }
    // }

    const {email, password} = userCredentials
    const handleSubmit = async event => { //remember that arrow function binds this function to the class automatically -> this.handleSubmit
        event.preventDefault(); //preventing default form behavior so we have full control over what happens
        // const {emailSignInStart} = this.props;

        emailSignInStart(email, password)

        // Replacing with sagas: Lecture 203 | 'Email Sign In Into Sagas
        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({email: '', password: ''}) //clear out the state of our form upon sign in
    
        // } catch (error) {
        //     // console.error(error)
        // };
    

    }
  
    const handleChange = event => {
        const {value, name} = event.target //pulling name from below and value from user input
        setUserCredentials({...userCredentials, [name]: value}) //so name could be email or password like in our state- dynamically assigning variables in ES6
    }

    // const {googleSignInStart} = this.props
    return (
        <div className="sign-in">
            <h2>
                I already have an account
            </h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput name="email" value={email} type="email" handleChange={handleChange} label="Email" required/>
                <FormInput name="password" value={password} type="password" handleChange={handleChange} label="Password" required/>
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}



const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
    // with the curly braces ({}) around email and password, we pass the parameters as objects where key and value are the same`
})

export default connect(null, mapDispatchToProps)(SignIn);