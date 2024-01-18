import { useEffect, useState } from 'react'
import './AdminApp.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import {Routes,Route, useNavigate } from 'react-router-dom'
import AdminPizzas from './AdminPizzas'
import AdminIndian from './AdminIndian'
import AdminBurgers from './AdminBurgers'
import AdminBevarages from './AdminBevarage'
import AdminSides from './AdminSides'
import AdminUsers from './AdminUsers'
import AdminOrders from './AdminOrders'
import AdminContacts from './AdminContacts'
import MyCalendar from '../../Components/Calendar'
import AdminFeedback from './AdminFeedbacks'
import AdminDonations from './AdminDonations'
import { AddProductsModalForOtherProducts } from '../../Components/ModalForCalendar'
import NewsPage from '../../Components/News'
import { useSelector } from 'react-redux'

function App({handleAdminDashboardClick}) {

  const{currUser} = useSelector(state=>state.login)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!currUser){
      navigate('/not-found')
      return;
    }else if(currUser){
      if(!currUser.isAdmin){
        navigate('/not-found')
        return
      }
    }
  },[currUser,navigate])
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const openCalendarModal = () => {
    setIsCalendarModalOpen(true);
  };
  const closeCalendarModal = () => {
    setIsCalendarModalOpen(false);
  };

  if(!currUser){
    navigate('/not-found')
    return;
  }else if(currUser){
    if(!currUser.isAdmin){
      navigate('/not-found')
      return
    }
  }
  return (
    <div className='grid-container'>

      <Header handleAdminDashboardClick = {handleAdminDashboardClick} OpenSidebar={OpenSidebar}  openCalendarModal={openCalendarModal}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <Routes>
        <Route path = '' element = {<Home></Home>}></Route>
        <Route path = 'customers' element = {<AdminUsers></AdminUsers>}></Route>
        <Route path = 'orders' element = {<AdminOrders></AdminOrders>}></Route>
        <Route path = 'contacts' element = {<AdminContacts></AdminContacts>}></Route>
        <Route path = 'feedbacks' element = {<AdminFeedback></AdminFeedback>}></Route>
        <Route path = 'donations' element = {<AdminDonations></AdminDonations>}></Route>
        <Route path = 'news' element = {<NewsPage></NewsPage>}></Route>
        <Route path = 'products/pizzas' element = {<AdminPizzas></AdminPizzas>}></Route>
        <Route path = 'products/indian-meals' element = {<AdminIndian></AdminIndian>}></Route>
        <Route path = 'products/burgers' element = {<AdminBurgers></AdminBurgers>}></Route>
        <Route path = 'products/sides' element = {<AdminSides></AdminSides>}></Route>
        <Route path = 'products/bevarages' element = {<AdminBevarages></AdminBevarages>}></Route>
      </Routes>
      {isCalendarModalOpen && (
        <AddProductsModalForOtherProducts Children={<MyCalendar></MyCalendar>} isOpen={isCalendarModalOpen} onRequestClose={closeCalendarModal} />
      )}
    </div>
  )
}

export default App