import React,{ useState } from 'react';
import Modal from 'react-modal';
import Sub from './Sub';
import './dropdown.css'

const customStyles = {
  overlay:{
    background:'transparent',
    
  },
  content: {
    // top: '50%',
    // left: '0%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    transform: 'translate(25%, 0%)',
    width:'10rem',
  },
};
const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(0%, -50%)',
    width:'10rem',
    zIndex:'1'
  },
};
Modal.setAppElement('body')
const DropDown = ({modalIsOpen,setModalIsOpen})=>{
    const [subIsOpen,setSubIsOpen] = useState(false);
    
    // const afterOpenModal = ()=>{
    //   subtitle.style.color='#f00'
    // }
    const openSub = () => {
      setSubIsOpen(true)
      console.log('sub')
  }
  const closeSub = () =>{
      setSubIsOpen(false)
  }
    const closeModal = ()=>{
      setModalIsOpen(false)
    }
    return(
        <div className = "dropDown">
         <div>
         <Modal
        isOpen = {modalIsOpen}
        onRequestClose = {closeModal}
        style={customStyles}
        ><div>

          <h1>Men</h1>
          
          <h1>Women</h1>
          <h1>Kids</h1>
          <h1>Baby</h1>
          <h1>Shoes</h1>
          <h1>Jewelry</h1>
          <h1>Sale</h1>
       
          </div>
          <button onClick = {closeModal}>Close</button>
        </Modal>
         </div>
         
         <div>
         <Sub customStyles2 = {customStyles2} subIsOpen = {subIsOpen} setSubIsOpen = {setSubIsOpen} closeSub = {closeSub}/>
       
         </div>
        
        
          
        </div>
    )    
}
    

export default DropDown;