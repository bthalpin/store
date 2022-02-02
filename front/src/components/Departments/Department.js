import React from 'react';
import './Departments.css';

const Department = ({department,changeDepartment})=>{
    const { name , image } = department
    return(
            <div onClick = {()=>changeDepartment(name)}className = "ad"><img className = "adimg" src={image} ></img><label className = "departLabel">{name}</label></div>
           
        
    )    
}
    

export default Department;