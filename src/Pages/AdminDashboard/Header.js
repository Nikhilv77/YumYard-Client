import React from "react";
import { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddProductsModalForOtherProducts } from "../../Components/ModalForCalendar";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsBoxArrowLeft,
} from "react-icons/bs";
 import MyCalendar from "../../Components/Calendar";
import { Link, useNavigate } from "react-router-dom";

function Header({ OpenSidebar,handleAdminDashboardClick,openCalendarModal }) {
  const [IsModalOpenForAddingProduct, setIsModalOpenForAddingProduct] = useState(false);

  const navigate = useNavigate()
  return (
    
    
    <header className="header">
      <div className="menu-icon">
        <BsJustify size={28} style={{color:'black'}} className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-center">
      <BiCalendar style={{cursor:'pointer'}} onClick={()=>{
      openCalendarModal();
      }} color="#333" size={30}> </BiCalendar>
      </div>
      <div className="header-right">
      <FontAwesomeIcon  style={{height:"25px",cursor:'pointer'}} onClick={()=>{
  handleAdminDashboardClick()
  navigate('/')}}icon={faSignOutAlt} size="lg" color="#333" />

      </div>
    </header>
  );
}

export default Header;
