import React from 'react';

import './products.css';


const Product = ({item,productInfo,setProductInfo,openInfo}) => {
console.log(productInfo,'state')

    const {id,name,description,url,price} = item;
    return (
        <div key ={id} className = "product" onClick = {()=>openInfo(item)}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>${price}</p>
            <img src = {url} alt="oops" width="25%"></img>
            
        </div>
    )
}

export default Product;