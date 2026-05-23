import React from "react";
import {NavLink} from "react-router-dom";
import './NavBar.css'

function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">eHotelMirnes</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/rooms" className={({isActive}) => isActive ? "active" : ""}>Rooms</NavLink></li>
                <li><NavLink to="/find-booking" className={({isActive}) => isActive ? "active" : ""}>Find My Booking</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;