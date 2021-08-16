import React from 'react';
import './Nav.css'

const Nav = ({openModal}) => {
    return (
        <div className = "navigationContainer">
            <div className="navLeft">
                <div>
                    Halpin
                </div>
                <div onClick = {openModal}>
                    =
                </div>
            </div>
            <div className = "navRight">
                <div>Search</div>
                <div>
                    Sign In
                </div>
                <div>
                    Cart
                </div>
                
            </div>
        </div>
    )
}

export default Nav;