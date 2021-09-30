import React from 'react';

import {SpinnerOverlay, SpinnerContainer} from './spinner.styles'

// From Spinner HOC
const Spinner = () => (
    <SpinnerOverlay>
        <SpinnerContainer />
    </SpinnerOverlay>
);

export default Spinner;