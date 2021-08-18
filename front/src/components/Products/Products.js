import React, {useState} from 'react';
import Product from './Product';

import Modal from 'react-modal';
import './products.css';


Modal.setAppElement('html')
const customStyle = {
    overlay:{
        
      },
      content: {
        top: '5%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0%)',
        width:'30vw',
        maxHeight:'70vh'
      },
}
const Products = ({products,filtered,setCheckout,checkout,removeFromCart,quantity,setQuantity}) => {
    
const [productInfo,setProductInfo] = useState([])
const [productCard,setProductCard] = useState(false)

const openInfo = (info)=>{
    setProductInfo(info)
    setProductCard(true)
    
    }
    
    const closeInfo=()=>{
        setProductCard(false)
    console.log('close')
    }
    const addToCart = (item) =>{        
        setCheckout(prevCheckout=>{
            return [...prevCheckout,item]
        })
        setQuantity(prevQuantity=>{
            return [...prevQuantity,1]
        })
        console.log(quantity)
    }
    return (
        <div className = "productContainer">
            {filtered.map((item)=>{
                return <Product item = {item} setProductInfo = {setProductInfo} productInfo = {productInfo} openInfo = {openInfo} addToCart = {addToCart}/>
            })}
            <Modal
        isOpen = {productCard}
        className = 'Modal'
        overlayClassName = 'Overlay'
        onRequestClose = {closeInfo}
        // style={customStyle}
        >
            {/* <div> */}
<div>
<h1 className = "productName">{productInfo.name}</h1>
            <p className = "productDesc">{productInfo.description}</p>
            <p className = "productPrice">${parseFloat(productInfo.price).toFixed(2)}</p>
            
</div>
<div>

<img className  = "productImg" src = {productInfo.url} alt="oops" ></img>
</div>
            {checkout.includes(productInfo)?
            <p>In cart
            <button onClick={()=>removeFromCart(productInfo)} >Remove</button>
            </p>
            :
            <button onClick = {()=>addToCart(productInfo)}>Add to Cart</button>
         
            }
             {/* </div> */}
          <button onClick = {closeInfo}>Close</button>
        </Modal>
        </div>
    )
}

export default Products;