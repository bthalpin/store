import React,{ useState,useEffect } from 'react';
import Modal from 'react-modal';
import Nav from './components/Nav/Nav';
import DropDown from './components//DropDown/DropDown';
import Products from './components/Products/Products';
import NavLeft from './components/Nav/NavLeft';
import './App.css';

Modal.setAppElement('body')

function App() {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [category,setCategory] = useState('all')
  const [products,setProducts] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/products',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        category:category,
      })
    }
      )
      .then(res=>res.json())
      .then(res=>{
        setProducts(res)
      })
      .catch(err=>console.log(err))
  },[category])

  const openModal = ()=>{
    setModalIsOpen(true)
    console.log('open')
  }

  
  
  return (
    <div>
      <Nav openModal = {openModal} />
      

      <NavLeft />
     
        
      <DropDown modalIsOpen = {modalIsOpen} setModalIsOpen = {setModalIsOpen}/>
      <Products products = {products}/>
      
    </div>
  );
}

export default App;
