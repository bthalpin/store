import React,{ useState,useEffect } from 'react';
import Modal from 'react-modal';
import Nav from './components/Nav/Nav';
import Navigation from './components/Nav/Navigation';
import DropDown from './components//DropDown/DropDown';
import Products from './components/Products/Products';
import NavLeft from './components/Nav/NavLeft';
import Cart from './components/Cart/Cart';
import Departments from './components/Departments/Departments';
import CheckoutCart from './components/Checkout/CheckoutCart';
import './App.css';

Modal.setAppElement('body')

function App() {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [category,setCategory] = useState('home')
  const [products,setProducts] = useState([])
  const [filter,setFilter] = useState('')
  const [filtered,setFiltered] = useState([])
  const [order,setOrder] = useState('')
  const [checkout,setCheckout] = useState([])
  const [cartIsOpen,setCartIsOpen] = useState(false)
  const [home,setHome] = useState(true)
  const [total,setTotal] = useState(0)
  const [storeDepartment,setStoreDepartment] = useState([])
  const [totalItems,setTotalItems] = useState()
  const [quantity,setQuantity] = useState({})
  const [payment,setPayment] = useState(false);
  const [success,setSuccess] = useState(false);
  

console.log(order)
  useEffect(()=>{
    fetch('https://halpin-store/heroku.com/products/',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        order:order
      })
  }
      )
      .then(res=>res.json())
      .then(res=>{
        console.log('here',res)
        setProducts(res)
        console.log(products,'after')
      })
      .catch(err=>console.log(err))
  },[category,order])

  useEffect(()=>{
    if (category!=='home'){

      setFiltered(products.filter((item)=>(item.category===category||category==='all')&&(filter===''||item.name.toUpperCase().includes(filter.toUpperCase())||item.description.toUpperCase().includes(filter.toUpperCase())||item.department.toUpperCase().includes(filter.toUpperCase()))))
      // setHome(false)
    }
  },[filter,products,category,storeDepartment])

  useEffect(()=>{
    fetch('https://halpin-store/heroku.com/departments/',{
      method:'get',
      headers:{'Content-Type':'application/json'}
    }
      )
      .then(res=>res.json())
      .then(res=>{
        setStoreDepartment(res)
      })
      .catch(err=>console.log(err))
  },[])
  useEffect(()=>{
    // setQuantity(window.localStorage.getItem(JSON.parse('quantity')))
    // setCheckout(window.localStorage.getItem(JSON.parse('checkout')))
    const initialQuantity = window.localStorage.getItem(('quantity'))
    const initialCheckout = window.localStorage.getItem(('checkout'))
    // initialQuantity.map(JSON.parse)
    // initialCheckout.map(JSON.parse)
    const loadedQuantity =JSON.parse(initialQuantity);
    const loadedCheckout = JSON.parse(initialCheckout)
    
    setCheckout(loadedCheckout)
    setQuantity(loadedQuantity)
    
    console.log(initialCheckout,initialQuantity,loadedQuantity,loadedCheckout)
    // console.log(window.localStorage.getItem(JSON.parse('checkout')))
  //   const checkUserData = ()=>{
  //     const initialCheckout = localStorage.getItem('checkout')
  //     const initialQuantity = localStorage.getItem('quantity')
  //     console.log(initialCheckout,initialQuantity,'initial')
  //     if (initialCheckout){
  //       setCheckout(initialCheckout);
    
  //     }
  //     if(initialQuantity){
  //       setQuantity(initialQuantity);
  
  //     }
  //     window.addEventListener('storage',checkUserData,false)
  //     return ()=>{
  //       window.removeEventListener('storage',checkUserData)
  //     }
  //   }
  //   return ()=>{

  // }
},[])

  useEffect(()=>{
    window.localStorage.setItem('checkout',JSON.stringify(checkout));
  },[checkout])

  useEffect(()=>{
    window.localStorage.setItem('quantity',JSON.stringify(quantity));
  },[quantity])

  

  const openModal = ()=>{
    setModalIsOpen(true)
    console.log('open')
  }

  const sort = (order) =>{
    setOrder(order)
  }
  
  const removeFromCart= (item,i)=>{
    let newQuant =quantity
    delete newQuant[item.id]
    setQuantity({...newQuant})
    setCheckout(checkout.filter((product)=>product.id!==item.id))
    
    console.log('i',i)
}

const closeSuccess = () =>{
  setSuccess(false)
}
  
  // console.log(checkout)
  return (
    <div className = "main">
      <div>
      <div className="navContainer">
      <Nav openModal = {openModal} filter = {filter} setFilter = {setFilter} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setHome = {setHome} setCategory = {setCategory} total = {total} quantity = {quantity} category = {category} totalItems = {totalItems}/>
      
    <Navigation sort = {sort} category = {category} home = {home}/>
    <Modal
                    isOpen = {success}
                    className = 'Modal'
                    overlayClassName = 'Overlay'
                    onRequestClose = {closeSuccess}
        >
            
                    <div className = "">
                          <h1>Payment Successful!</h1>
                          <p>A confirmation email will be sent shortly.  Thank you for your purchase.</p>
                    </div>

                </Modal>
    </div>
      {payment?
      <CheckoutCart total={total} setPayment = {setPayment} setCheckout={setCheckout} success={success} setSuccess={setSuccess} checkout={checkout} quantity = {quantity} />
      :
      category==='home'?
      <div className = "container">
      <Departments setHome = {setHome} setCategory = {setCategory} storeDepartment = {storeDepartment}/>
      <DropDown storeDepartment = {storeDepartment} setCategory = {setCategory} modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen} setHome = {setHome}/>
      <Cart cartIsOpen = {cartIsOpen} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setCheckout = {setCheckout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity} total = {total} setTotal = {setTotal} setTotalItems = {setTotalItems} setPayment = {setPayment} />
      </div>
      :
    <div className = "container">

    <NavLeft setCategory = {setCategory} storeDepartment = {storeDepartment} />
    {console.log(storeDepartment)}
    <Cart cartIsOpen = {cartIsOpen} setCartIsOpen = {setCartIsOpen} checkout = {checkout} setCheckout = {setCheckout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity} total = {total} setTotal = {setTotal} setTotalItems = {setTotalItems} setPayment = {setPayment} />
    <DropDown storeDepartment = {storeDepartment} setCategory = {setCategory} modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen} setHome = {setHome}/>
      <Products products = {products} filtered = {filtered} setCheckout = {setCheckout} checkout = {checkout} removeFromCart = {removeFromCart} quantity = {quantity} setQuantity = {setQuantity} setCartIsOpen = {setCartIsOpen} />
   {console.log('quantity',quantity)}
    </div>
    }
      </div>
      
      
      
    </div>
  );
}

export default App;
