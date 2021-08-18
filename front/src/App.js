import React,{ useState,useEffect } from 'react';
import Modal from 'react-modal';
import Nav from './components/Nav/Nav';
import Navigation from './components/Nav/Navigation';
import DropDown from './components//DropDown/DropDown';
import Products from './components/Products/Products';
import NavLeft from './components/Nav/NavLeft';
import Cart from './components/Cart/Cart';
import Departments from './components/Departments/Departments';
import './App.css';

Modal.setAppElement('body')

function App() {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [category,setCategory] = useState('all')
  const [products,setProducts] = useState([])
  const [filter,setFilter] = useState('')
  const [filtered,setFiltered] = useState([])
  const [order,setOrder] = useState('')
  const [checkout,setCheckout] = useState([])
  const [cartIsOpen,setCartIsOpen] = useState(false)
  const [home,setHome] = useState(true)
  const [total,setTotal] = useState(0)
  
  const [quantity,setQuantity] = useState([])
  

console.log(order)
  useEffect(()=>{
    fetch('http://localhost:3000/products',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        category:category,
        order:order
      })
    }
      )
      .then(res=>res.json())
      .then(res=>{
        setProducts(res)
      })
      .catch(err=>console.log(err))
  },[category,order])

  useEffect(()=>{
    setFiltered(products.filter((item)=>item.name.toUpperCase().includes(filter.toUpperCase())||item.description.toUpperCase().includes(filter.toUpperCase())||item.category.toUpperCase().includes(filter.toUpperCase())))
  },[filter,products])

  const openModal = ()=>{
    setModalIsOpen(true)
    console.log('open')
  }

  const sort = (order) =>{
    setOrder(order)
  }
  
  const removeFromCart= (item,i)=>{
    let newQuant =quantity
    newQuant.splice(i,1)
    setQuantity([...newQuant])
    setCheckout(checkout.filter((product)=>product.id!==item.id))
    
    console.log('i',i)
}

  
  // console.log(checkout)
  return (
    <div className = "main">
      <div>
      <div className="navContainer">
      <Nav openModal = {openModal} filter = {filter} setFilter = {setFilter} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setHome = {setHome} setCategory = {setCategory} total = {total} quantity = {quantity}/>
      
    <Navigation sort = {sort} category = {category} home = {home}/>
      </div>
      {home?
      <>
      <Departments />
      <DropDown modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen} setHome = {setHome}/>
      <Cart cartIsOpen = {cartIsOpen} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setCheckout = {setCheckout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity} total = {total} setTotal = {setTotal}/>
      </>
      :
    <div className = "container">

    <NavLeft setCategory = {setCategory} />
    
    <Cart cartIsOpen = {cartIsOpen} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setCheckout = {setCheckout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity} total = {total} setTotal = {setTotal}/>
    <DropDown modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen} setHome = {setHome}/>
    <Products products = {products} filtered = {filtered} setCheckout = {setCheckout} checkout = {checkout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity}/>
   {console.log('quantity',quantity)}
    </div>
    }
      </div>
      
      
      
    </div>
  );
}

export default App;
