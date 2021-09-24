import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    // stripe wants this in cents
    const publishablekey = 'pk_test_51JPE2eGQqIxAUy4Vnabh4rFBFcInP1i0JZVo4RQQ2qCyujK9alVCF5yfW5sIctTmrhRvjRvPe35kHW2BA8eVDn8t00jVbsOwZg'

    // Ideally we'll pass the token to a backend to process the charge but since we're testing...
    const onToken = token => {
        // console.log(token);
        // console.alert('Payment Successful')
        // axios knows we going to our 'payment' route
        // axios is an alternative for 'fetch' but more comprehensive
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
                // token: token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Payment error: ', JSON.parse(error))
            alert(
                'There was an issue with your payment. Please ensure you use the provided credit card'
            )
        })
    }

    return (
        <StripeCheckout 
            label = 'Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;