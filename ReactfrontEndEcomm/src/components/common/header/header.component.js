import React from 'react'
import { NavLink ,withRouter } from 'react-router-dom'
import './header.component.css'

const logoutfun = (history) =>{

    localStorage.clear()
    history.push('/')
}

   const HeaderComponent=(props)=>{
const currentUser= JSON.parse(localStorage.getItem('user'))
    console.log('props in header >>',props)
     const content = props.isLoggedIn ? (
       <ul className="nav-list">
         <li className="nav-item">
           <NavLink activeClassName="selected" to="/dashboard">
             Home
           </NavLink>
         </li>

         <li className="nav-item">
           <NavLink activeClassName="selected" to="/services">
             Services
           </NavLink>
         </li>

         <li className="nav-item">
           <NavLink activeClassName="selected" to="/contact">
             Contact
           </NavLink>
         </li>

         <li className="nav-item">
           <NavLink activeClassName="selected" to="/about">
             About
           </NavLink>
         </li>

         <li className="nav-item">
           <button
             className="btn btn-info logout"
             onClick={() => logoutfun(props.history)}
           >
             Logout
           </button>
           <span style={{color:"white",float:"right",marginRight:'10px' ,marginTop:"15px"}}>{currentUser.username}</span>

         </li>
       </ul>
     ) : (
       <ul className="nav-list">
         <li className="nav-item">
           <NavLink activeClassName="selected" to="/home">
             Home
           </NavLink>
         </li>

         {/* <li className="nav-item">
           <NavLink activeClassName="selected" to="/contact">
             Contact
           </NavLink>
         </li> */}

         <li className="nav-item">
           <NavLink activeClassName="selected" to="/register">
             Register
           </NavLink>
         </li>

         <li className="nav-item">
           <NavLink activeClassName="selected" exact to="/">
             Login
           </NavLink>
         </li>
       </ul>
     );
    return (
      <div className="nav-bar">
        {content}
      </div>
    );
 }
 export const Header=withRouter(HeaderComponent)