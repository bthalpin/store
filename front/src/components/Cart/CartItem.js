import React,{ useState } from 'react';
import './Cart.css';

const CartItem = ({item,removeFromCart,setQuantity,i,quantity})=>{
    const quantityUpdate = (event) =>{
        
        const tempQuantity = quantity
        tempQuantity[item.id]=parseInt(event.target.value)
        setQuantity({...tempQuantity})
        console.log(quantity)
    
    }
    return(
        <div className = "cartItem">
            <div>
                <img src = {item.url} alt ='oops' width="30vw"></img>
            </div>
<div>
            {item.name}
        </div>
        <div>
            {'$'+parseFloat(item.price).toFixed(2)}
        </div>
        <div>
            <input onInput={quantityUpdate} type="number" min='1' max={item.quantity} value={quantity[item.id]}></input>
            {/* <select onInput={quantityUpdate}>
                <option value = '1'>1</option>
                <option value = '2'>2</option>
                <option value = '3'>3</option>
                <option value = '4'>4</option>
                <option value = '5'>5</option>
            </select> */}
        </div>
        <button onClick = {()=>removeFromCart(item,i)}>Remove</button>
        </div>
        
    )    
}
    

export default CartItem;