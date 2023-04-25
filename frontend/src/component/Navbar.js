import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../logo.png';

const Navbar = ()=>{
       const auth = localStorage.getItem('user');
       const navigate = useNavigate();
       const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
       } 

    return (
        <div>
            <img className="logo" src={logo} alt="logo" />
            { auth ?
            <ul className="nav-ul">
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Products</Link></li>
                <li><Link onClick={logout} to='/signup'>Log out ({JSON.parse(auth).name})</Link></li>
            </ul>
            :
            <ul className="nav-ul nav-right">
            <li><Link to='/signup'>Sign Up</Link></li>
            <li><Link to='/login'>Log in</Link></li>
            </ul>
            }
        </div>
    )
}

export default Navbar