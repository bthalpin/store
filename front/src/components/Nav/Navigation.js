import React from 'react';
import './Nav.css'

const Navigation = ({openModal,sort,category,home}) => {
    return (
        <div className = "subNav">
            <div className = "location">
            {category==='all'||category==='home'?<p> </p>:
            
            <p>{category}</p>
            }
            
            </div>
            {category==='home'?
            <></>
            :
            <div className = "filter">
            <button onClick = {()=>sort('DESC')}>High to Low</button>
            <button onClick = {()=>sort('ASC')}>Low to High</button>
            </div>
        }
            
        </div>
    )
}

export default Navigation;