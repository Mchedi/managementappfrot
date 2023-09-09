import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function handleLogout() {
    // Clear local storage
    localStorage.clear();
  }
const Navbar2 = () => {
    const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/home">  Ecommerce Mangement</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Products2">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about2">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Mysoc">dashbord</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact2">Contact</NavLink>
                        </li>
                    </ul>
                 
                </div>
                <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>

                <NavLink className="nav-link" to="/"> <button className="btn btn-outline-dark m-2" onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout  </button></NavLink>

            </div>
        </nav>
    )
}

export default Navbar2