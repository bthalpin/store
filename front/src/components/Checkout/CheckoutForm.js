import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Checkout.css';

// fetch('http://localhost:8000/checkout/',{
        //     method:'post',
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify({
        //       checkout:checkout,
        //       quantity:quantity
        //     })
        //   })
        //   .then(res=>res.json())
        //   .then()
        //   .catch(err=>console.log(err))
        //   console.log(quantity)

const CheckoutForm = ({total,setPayment,setCheckout,success,setSuccess,checkout,quantity}) => {
    
    const [cardError,setCardError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const stripeTotal = parseInt(total*100)

    const handleSubmit = async (e) => {
        e. preventDefault()
        const { error,paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if(!error){
            try{
                const { id } = paymentMethod
                console.log(e.target[1].value,e.target[2].value,e.target[3].value,checkout)
                const response = await axios.post('https://halpin-store/heroku.com/payment',{
                    amount: stripeTotal,
                    id:id,
                    first:e.target[1].value,
                    last:e.target[2].value,
                    email:e.target[3].value,
                    checkout:checkout,
                    quantity:quantity
                })
                if (response.data.success){
                    console.log('Successful payment')
                    setSuccess(true)
                    setCheckout([])
                    setPayment(false)
                }
                else{
                    console.log(response.data.message)
                    setCardError('There was a problem with the payment, please enter a valid card number')
                }
            } catch (error){
                console.log('Error',error)
            }
        } else {
            console.log(error.message)
        }
    }
    const goBack =() =>{
        setPayment(false)
    }

    
    return (
        <>
        {!success?
        <>
        <button onClick={goBack}>&lt; Back</button>
        <h2>Your total is {total}</h2>
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className='FormRow'>
                    <div className='FormRow'>
                        <label for='first'>First</label>
                    <input type='text' id='first' ></input>
                    <label for='last'>Last</label>
                    <input type='text' id='last' ></input>
                    <label for='email'>Email</label>
                    <input type='email' id='email' ></input>
                    
                    </div>
                    <div className='FormRow'>
                    <CardElement />
                    </div>
                    
                </div>
            </fieldset>
            <button>Submit</button>            
            <p>{cardError}</p>
        </form>
        </>
        
        :
        
        <div>
            <h1>Success!!</h1>
        </div>
        }
        </>
    )
}

export default CheckoutForm;