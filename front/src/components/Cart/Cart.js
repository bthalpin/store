import React,{ useState,useEffect } from 'react';
import CartItem from './CartItem';
import Modal from 'react-modal';
import './Cart.css';

const cartStyles = {
  overlay:{
    
  },
  content: {
    top: '5%',
    left: '10%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(-5%, 0%)',
    width:'80vw',
    height:'80vh'
  },
};
const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(0%, -50%)',
    // width:'10rem',
    zIndex:'1'
  },
};


const Cart = ({cartIsOpen,setCartIsOpen,checkout,setCheckout,removeFromCart,quantity,setQuantity,total,setTotal,setTotalItems})=>{
    
    useEffect(()=>{
        let i=-1;
        setTotal(checkout.reduce((acc,item)=>{
            // i++
            // console.log(i,quantity[i])
            let x=parseFloat(item.price)*quantity[item.id]
            // console.log(quantity[i],x,'here')
            return acc+= x           
        },0))
        setTotalItems(checkout.reduce((acc,item)=>{
          return acc+=quantity[item.id]
        },0))
    },[checkout,quantity])
    const closeCart = ()=>{
      setCartIsOpen(false)
    }
    const checkOut = () =>{
        fetch('http://localhost:8000/checkout/',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              checkout:checkout,
              quantity:quantity
            })
          })
          .then(res=>res.json())
          .then()
          .catch(err=>console.log(err))
          console.log(quantity)
    }
    let inCart = [];
    return(
        <div className = "dropDown">
         <div>
         <Modal
        isOpen = {cartIsOpen}
        onRequestClose = {closeCart}
        className='Cart'
        overlayClassName = 'CartOverlay'
        ><div className = "shoppingCart">
            {checkout.length===0?<h1>Shopping cart is empty</h1>:<></>}
          {checkout.map((item,i)=>{
              if (!inCart.includes(item)){
                inCart.push(item)
                return <CartItem item = {item} removeFromCart = {removeFromCart} i={i} setQuantity = {setQuantity} quantity = {quantity}/>
              }
          })}
          </div>
          <div className = "mainCheckout">
              <div>

              Total {'$'+total?.toFixed(2)}
              </div>
              <div className = "checkoutArea">
              <button className = "checkoutButton" onClick = {checkOut}>Check Out</button>
       
       <button className = "checkoutButton" onClick = {closeCart}>Close</button>
       
              </div>
         
          </div>
          </Modal>
         </div>
         
        
        
          
        </div>
    )    
}
    

export default Cart;