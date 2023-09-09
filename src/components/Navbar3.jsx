import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function handleLogout() {
    // Clear local storage
    localStorage.clear();
  }
const Navbar3 = () => {
    const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/home3">  Ecommerce Mangement</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home3">Home </NavLink>
                        </li>
                      
                    
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/AllSoc">AllSoc</NavLink>
                        </li>
                     
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Allusers">Allusers</NavLink>
                        </li>   
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Allusers">Create sub</NavLink>
                        </li> 
                    </ul>
                 
                </div>

                <NavLink className="nav-link" to="/"> <button className="btn btn-outline-dark m-2" onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout  </button></NavLink>

            </div>
        </nav>
    )
}

export default Navbar3