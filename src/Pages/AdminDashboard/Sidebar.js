import React, { useState } from "react";
import {
  BsCart3,
  BsGrid,
  BsPerson,
  BsListCheck,
  BsChat,
  BsEnvelope,
  BsHeart,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";

import { FaNewspaper } from 'react-icons/fa';
import "./AdminApp.css";


export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const toggleProductsOpen = () => {
    setIsProductOpen(!isProductOpen);
  };
  const navigate = useNavigate();
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            onClick={()=>{
              navigate('/admin-dashboard')
            }}
            style={{ height: "80px", width: "100px" }}
            src="/YumYard.png"
            alt=""
          />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard')
        }}>
          <Link to ="/admin-dashboard">
            <BsGrid className="icon" />
            Dashboard
          </Link>
        </li>
        <li
          style={{ color: "white" }}
          onClick={toggleProductsOpen}
          className="sidebar-list-item"
        >
          <BsCart3 className="icon" />
          Products
          {isProductOpen ? (
            <BsChevronUp
              style={{ height: "15px", width: "15px", marginLeft: "4px" }}
              className="icon"
            />
          ) : (
            <BsChevronDown
              style={{ height: "15px", width: "15px", marginLeft: "4px" }}
              className="icon"
            />
          )}
          {isProductOpen && (
            <ul className="sidebar-list">
              <li className="sidebar-list-item mt-3"  onClick={()=>{
          navigate('/admin-dashboard/products/indian-meals')
        }}>
                <Link to="/admin-dashboard/products/indian-meals">Indian Cuisine</Link>
              </li>
              <li className="sidebar-list-item"  onClick={()=>{
          navigate('/admin-dashboard/products/pizzas')
        }}>
                <Link to="/admin-dashboard/products/pizzas">Pizzas</Link>
              </li>
              <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/products/burgers')
        }}>
                <Link to="/admin-dashboard/products/burgers">Burgers</Link>
              </li>
              <li className="sidebar-list-item"  onClick={()=>{
          navigate('/admin-dashboard/products/sides')
        }}>
                <Link to="/admin-dashboard/products/sides">Sides</Link>
              </li>
              <li className="sidebar-list-item"  onClick={()=>{
          navigate('/admin-dashboard/products/bevarages')
        }}>
                <Link to="/admin-dashboard/products/bevarages">Beverages</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/customers')
        }}>
          <Link to="/admin-dashboard/customers">
            <BsPerson className="icon" />
            Customers
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/orders')
        }}>
          <Link to="/admin-dashboard/orders">
            <BsListCheck className="icon" />
            Orders
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/feedbacks')
        }}>
          <Link to="/admin-dashboard/feedbacks">
            <BsChat className="icon" />
            Feedbacks
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/contacts')
        }}>
          <Link to="/admin-dashboard/contacts">
            <BsEnvelope className="icon" />
            Contacts
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/donations')
        }}>
          <Link to="/admin-dashboard/donations">
            <BsHeart className="icon" />
            Donations
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={()=>{
          navigate('/admin-dashboard/news')
        }}>
          <Link to="/admin-dashboard/news">
            <FaNewspaper className="icon" />
            News
          </Link>
        </li>
      </ul>
    </aside>
  );
}
