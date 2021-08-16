import React,{ useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('body')
const Sub = ({customeStyles2,subIsOpen,setSubIsOpen,closeSub})=>{

    
    // const afterOpenModal = ()=>{
    //   subtitle.style.color='#f00'
    // }
   
    const closeModal = ()=>{
      setSubIsOpen(false)
    }
    return(

        <Modal
        isOpen = {subIsOpen}
        onRequestClose = {closeSub}
        styles={customeStyles2}
        >
          <div>

          <h1>WORKING</h1>
       
          </div>
          <button onClick = {closeModal}>Close</button>
        </Modal>
    )    
}
    

export default Sub;