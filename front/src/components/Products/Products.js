import React, {useState} from 'react';
import Product from './Product';
import close from '../../images/delete.png';
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
const Products = ({products,filtered,setCheckout,checkout,removeFromCart,quantity,setQuantity,setCartIsOpen}) => {
    
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
        let id = item.id   
        setCheckout(prevCheckout=>{
            return [...prevCheckout,item]
        })
        // setQuantity(prevQuantity=>{
        //     return [...prevQuantity,1]
        // })
        setQuantity(prevQuantity=>{
            return {...prevQuantity,[id]:1}
        })
        console.log(quantity)
    }
    const openCart = () =>{
        setCartIsOpen(true)
        setProductCard(false)
    }
    
    return (
        <div>
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
                    <div className = "productInfo">
                        <h1 className = "productName">{productInfo.name}</h1>
                        <p className = "productDesc">{productInfo.description}</p>
                        <p className = "productPrice">${parseFloat(productInfo.price).toFixed(2)}</p>
            
                    </div>
                    <div>

                        <img className  = "productImg" src = {productInfo.url} alt="oops" ></img>
                        {console.log('before load',checkout,productInfo,checkout.includes(productInfo))}
                        {productInfo.quantity<=0?<p>OUT OF STOCK</p>:
                            checkout.find(item=>item.id===productInfo.id)?
                                <div>In cart
                                        
                                    {console.log(checkout,productInfo,'addremove')}
                                    <button className = "modalButton" onClick={()=>removeFromCart(productInfo)} >Remove</button>
                                    <button className = "modalButton" onClick={openCart} >Check Out</button>
                                </div>
                                    :
                                    <button className = "modalButton" onClick = {()=>addToCart(productInfo)}>Add to Cart</button>
                                
                                }
                    </div>
                    <div className = "close">
                        <img className = "closeButton" src = {close} alt = "close" onClick = {closeInfo}/>
                            
                                    
                    </div>

             {/* </div> */}
                </Modal>
        
                <div className = "">
                </div>
        
            </div>
        </div>
    )
}

export default Products;