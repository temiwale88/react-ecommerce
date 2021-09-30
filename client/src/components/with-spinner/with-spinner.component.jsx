import React from 'react';

import Spinner from '../spinner/spinner.component'

// This is a higher order component in that it is a function that returns a transformed component
// See HOC spinner lecture 182
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps}) => {
    return isLoading ? (
        <Spinner/>
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;