import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.component.css'

export const Sidebar = () =>{
    return (
      <div className="sidebar">
        <NavLink activeClassName="selected-sidebar" to="/add_product">
          Add Products
        </NavLink>
        <NavLink activeClassName="selected-sidebar" to="/view_product">
          View Products
        </NavLink>
        <NavLink activeClassName="selected-sidebar" to="/search_product">
          Search Product
        </NavLink>
        <NavLink activeClassName="selected-sidebar" to="/notification">
          Notification
        </NavLink>
        <NavLink activeClassName="selected-sidebar" to="/message">
          Message
        </NavLink>
      </div>
    );
}