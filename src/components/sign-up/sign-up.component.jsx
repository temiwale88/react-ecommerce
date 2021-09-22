import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'
// import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import {signUpStart} from '../../redux/user/user.actions'
import './sign-up.styles.scss';

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: '', 
            email: '', 
            password: '', 
            confirmPassword: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state
        // handle password mismatch issues
        if(password !== confirmPassword) {
            alert("passwords don't match");
            return;
        // } else {
        }
        signUpStart({displayName, email, password})

        // Refactored after Lecture 210: Solution: Sign Up Saga 
        // try {
        //     const {user} = await auth.createUserWithEmailAndPassword(email, password);

        //     // create user document in our nosql db (firebase)
        //     await createUserProfileDocument(user, {displayName});

        //     // Then clear the form
        //     this.setState({
        //         displayName: '', 
        //         email: '', 
        //         password: '', 
        //         confirmPassword: ''
        //     })
        // } catch (error) {
        //     console.error(error)
        // };

    }
    
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span> Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                    />
                    <CustomButton type='submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);