import React from 'react';

import './products.css';


const Product = ({item,productInfo,setProductInfo,openInfo,addToCart}) => {
// console.log(productInfo,'state')

    const {id,name,description,url,price,quantity} = item;
    return (
        <div key ={id} className = "product" onClick = {()=>openInfo(item)}>
            <img className = "" src = {url} alt="oops" width="80%" ></img>
            <h1 className = "productName" >{name}</h1>
            {console.log('localhost:8000/static/images/'+url,'url')}
            <p>{description}</p>
            <p className = "productPrice" >${parseFloat(price).toFixed(2)}</p>
            {quantity?
            
            <p>{quantity}</p>
            :
            <p>Out of Stock</p>
            }
        </div>
    )
}

export default Product;