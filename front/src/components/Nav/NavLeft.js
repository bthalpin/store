import React from 'react';
import './Nav.css'

const NavLeft = ({setCategory,storeDepartment}) => {
    return (
        <div className = "sideBar">
            <ul>
            <li onClick = {()=>setCategory('all')}>all</li>
                {storeDepartment.map(dep=>{
                    return <li onClick = {()=>setCategory(dep.name)}>{dep.name}</li>
                })}
            </ul>
        </div>
    )
}

export default NavLeft;