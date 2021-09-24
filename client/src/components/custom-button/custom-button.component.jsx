import React from 'react'; 
import './custom-button.styles.scss'

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button className= {`${inverted ? 'inverted': ''} ${isGoogleSignIn ? 'google-sign-in': ''} custom-button`} {...otherProps}>
        {children} 
        {/* "children are what's in between this html tag e.g. "Sign In" like in the sign-in.component.jsx */}
    </button>
)

export default CustomButton;