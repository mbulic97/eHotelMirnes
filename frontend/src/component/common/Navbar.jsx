import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import './NavBar.css'
import ApiService from '../../service/ApiService'

function Navbar(){
    const isAuthenticated = ApiService.isAuthenticated();
    const navigate = useNavigate();
    const isUser = ApiService.isUser();
    const isAdmin = ApiService.isAdmin

    const handleLogout = () =>{
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if(isLogout){
            ApiService.logout()
            navigate('/home');
        }
    };
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">eHotelMirnes</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
                <li><NavLink to="/rooms" className={({isActive}) => isActive ? "active" : ""}>Rooms</NavLink></li>
                <li><NavLink to="/find-booking" className={({isActive}) => isActive ? "active" : ""}>Find My Booking</NavLink></li>
                {isUser && <li><NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" className={({isActive}) => isActive ? "active" : ""}>Admin</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" className={({isActive}) => isActive ? "active" : ""}>Register</NavLink></li>}
                
                {isAuthenticated && <li className="logout" onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    )
}

export default Navbar;