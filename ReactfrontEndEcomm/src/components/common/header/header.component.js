import React from 'react'
import { NavLink ,withRouter } from 'react-router-dom'
import './header.component.css'

const logoutfun = (history) =>{

    localStorage.clear()
    history.push('/')
}

   const HeaderComponent=(props)=>{

    console.log('props in header >>',props)
     const content = props.isLoggedIn ? (
       <ul className="nav-list">
         <li className="nav-item">
           <NavLink activeClassName="selected" to="home">
             Home
           </NavLink>{" "}
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
           <NavLink activeClassName="selected" to="/logout">
             Logout
           </NavLink>
         </li>
       </ul>
     ) : (
       <ul className="nav-list">
         <li className="nav-item">
           <NavLink activeClassName="selected" to="home">
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
           <NavLink activeClassName="selected" to="/setting/kishor">
             Setting
           </NavLink>
         </li>

         <li className="nav-item">
           <NavLink activeClassName="selected" exact to="/">
             Login
           </NavLink>
         </li>
         <li className="nav-item">
           <button
             className="btn btn-info logout"
             onClick={() => logoutfun(props.history)}
           >
             Logout
           </button>
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