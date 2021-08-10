import React, {Component} from "react"; 
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'

import {auth, signInWithGoogle} from '../../firebase/firebase.utils'
import './sign-in.styles.scss'

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => { //remember that arrow function binds this function to the class automatically -> this.handleSubmit
        const {email, password} = this.state;
        event.preventDefault(); //preventing default form behavior so we have full control over what happens
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''}) //clear out the state of our form upon sign in
    
        } catch (error) {
            // console.error(error)
        };
    

    }
  
    handleChange = event => {
        const {value, name} = event.target //pulling name from below and value from user input
        this.setState({[name]: value}) //so name could be email or password like in our state- dynamically assigning variables in ES6
    }

    render() {
        return(
            <div className="sign-in">
                <h2>
                    I already have an account
                </h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" value={this.state.email} type="email" handleChange={this.handleChange} label="Email" required/>
                    <FormInput name="password" value={this.state.password} type="password" handleChange={this.handleChange} label="Password" required/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;