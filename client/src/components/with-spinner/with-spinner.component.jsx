import React from 'react';

import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles'

// This is a higher order component in that it is a function that returns a transformed component
// See HOC spinner lecture 182
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;