import React from 'react';
import './Nav.css';
import logo512 from '../../images/logo512.png';
import cart from '../../images/cart.png';

const Nav = ({openModal,filter,setFilter,setCartIsOpen,checkout,setHome,setCategory,total,quantity}) => {
    const search = (event)=>{
        setHome(false)
setFilter(event.target.value)
console.log(event)
    }
    const closeCart = () =>{
        setCartIsOpen(true)
    }
    const goHome =()=>{
        setCategory('all')
        setHome(true)
    }
    return (
        <div className = "navigationContainer">
            <div className="navLeft">
                <div>
                    <img onClick = {goHome} src = {logo512} alt = "Halpin" width = "30rem"></img>
                </div>
                <div onClick = {openModal}>
                    =
                </div>
            </div>
            <div className = "navRight">
                <div><input type = "text" placeholder = "Search" onInput = {search}></input>
                    
                </div>
                <div>
                    Sign In
                </div>
                <div className = "cartContainer" onClick = {closeCart}>
                    <img src = {cart} alt = 'Cart' width = "40rem"></img>
                    <div className = "itemCount">{quantity.reduce((acc,item)=>{
                        return acc+=item
                    },0)}</div>
                    <div className = "cartTotal">{'$'+parseFloat(total).toFixed(2)}</div>
                </div>
                
            </div>
        </div>
    )
}

export default Nav;