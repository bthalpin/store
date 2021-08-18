import React from 'react';
import './Nav.css'

const NavLeft = ({setCategory}) => {
    return (
        <div className = "sideBar">
            <ul>
            <li onClick = {()=>setCategory('all')}>all</li>
                <li onClick = {()=>setCategory('Men Suit')}>men</li>
                <li onClick = {()=>setCategory('Women Suit')}>women</li>
                
                <li>men</li>
                <li>men</li>
                <li>men</li>
                <li>men</li>
                <li>men</li>
                <li>men</li>
                <li>men</li>
                <li>men</li>
            </ul>
        </div>
    )
}

export default NavLeft;