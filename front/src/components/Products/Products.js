import React, {useState} from 'react';
import Product from './Product';

import Modal from 'react-modal';
import './products.css';

const Products = ({products}) => {
    
const [productInfo,setProductInfo] = useState([])
const [productCard,setProductCard] = useState(false)

const openInfo = (info)=>{
    setProductInfo(info)
    setProductCard(true)
    
    }
    
    const closeInfo=()=>{
        setProductCard(false)
    // console.log(productInfo)
    }
    return (
        <div className = "productContainer">
            {products.map((item)=>{
                return <Product item = {item} setProductInfo = {setProductInfo} productInfo = {productInfo} openInfo = {openInfo}/>
            })}
            <Modal
        isOpen = {productCard}
        onRequestClose = {closeInfo}
        // style={customStyles}
        ><div>

<h1>{productInfo.name}</h1>
            <p>{productInfo.description}</p>
            <p>${productInfo.price}</p>
            <img src = {productInfo.url} alt="oops" height ="100%"></img>
       
          </div>
          <button onClick = {closeInfo}>Close</button>
        </Modal>
        </div>
    )
}

export default Products;