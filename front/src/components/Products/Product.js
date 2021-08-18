import React from 'react';

import './products.css';


const Product = ({item,productInfo,setProductInfo,openInfo,addToCart}) => {
// console.log(productInfo,'state')

    const {id,name,description,url,price} = item;
    return (
        <div key ={id} className = "product" onClick = {()=>openInfo(item)}>
            <img className = "" src = {url} alt="oops" width="80%" ></img>
            <h1 className = "productName" >{name}</h1>
            
            
            <p className = "productPrice" >${parseFloat(price).toFixed(2)}</p>
        </div>
    )
}

export default Product;