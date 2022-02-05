import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import './Checkout.css';

const PUBLIC_KEY = 'pk_test_51JsS2bBBvrM6n7Q2PUiNk3ULVjO6DhxUfHNQVWRn6MowwAnWB0FudrVsc00PEQdAzi2wWNjLPQFSbLzmwtULgiKe00YP3tpzk0'

const appearance = {
    theme: 'night'
}

const options = {
    appearance
}

const stripeTestPromise = loadStripe(PUBLIC_KEY)



const CheckoutCart = ({total,setPayment,setCheckout,success,setSuccess,checkout,quantity}) =>{
    return(
        <Elements stripe = {stripeTestPromise} options = {options}>
            <CheckoutForm total={total} setPayment = {setPayment} setCheckout={setCheckout} success={success} setSuccess={setSuccess} checkout={checkout} quantity = {quantity}/>
        </Elements>
    )
}

export default CheckoutCart;