
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas,Badge,FormSelect } from 'react-bootstrap';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../Actions/LoginAction";
import { Link, useNavigate } from "react-router-dom";
import { BsPerson, BsBag, BsNewspaper } from "react-icons/bs";
import {FaShoppingCart} from 'react-icons/fa'
import { useState,useEffect } from 'react';

function OffcanvasExample() {
  const[searchHint,setSearchHint] = useState(['Indian food 😋...', 'Yummy Pizza🍕...','Tasty Burger🍔...','Crispy Snacks🍟...','Cool Beverages🥤...'])
  const[currentHint,setCurrentHint] = useState(0)
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('indian');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currUser } = useSelector((state) => state.login);
  const cartState = useSelector((state) => state.cart);
  const cartItems = cartState.cartItems;
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const handleSearch = ()=>{
    if(category == 'indian'){
      navigate('/indian-meals',{state:searchValue})
    }
    else if(category === 'pizzas'){
      navigate('/pizzas',{state:searchValue})
    }else if(category === 'burgers'){
      navigate('/burgers',{state:searchValue})
    }else if (category === 'sides'){
      navigate('/sides',{state:searchValue})
    }else if(category === 'beverages'){
      navigate('/bevarages',{state:searchValue})
    }
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentHint((prev)=>(prev+1)%searchHint.length)
    },2500)
    return ()=>{clearInterval(interval)}
  },[searchHint])
  return (
    <Navbar variant='dark' bg="dark" expand="lg"  style={{ fontFamily: "'Tinos', serif",fontSize:'1.2rem'}}>
      <Container fluid>
        <Navbar.Brand > <Link to="/" className="navbar-brand">
          <img
            src="/YumYard.png"
            alt="YumYard Logo"
            style={{ height: '65px', width: '100px' }}
          />
        </Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse  id="offcanvasNavbar">
          <Nav className="mx-auto" align = "left">
          <Nav.Link  as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/cart">
            <FaShoppingCart  size={25} />
            <Badge bg="danger">{cartItems.length}</Badge>
          </Nav.Link>
          <NavDropdown  title={<span>Meals</span>} id="basic-nav-dropdown" align="end">
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/products">
        All Meals
      </NavDropdown.Item>
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/indian-meals">
        Indian
      </NavDropdown.Item>
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/pizzas">
        Pizzas
      </NavDropdown.Item>
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/burgers">
        Burgers
      </NavDropdown.Item>
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/sides">
        Sides & Snacks
      </NavDropdown.Item>
      <NavDropdown.Item style={{fontSize:'1.2rem'}} className="dropdown-item" as={Link} to="/bevarages">
        Beverages
      </NavDropdown.Item>
    </NavDropdown>
          <Nav.Link  as={Link} to="/aboutus">About Us</Nav.Link>
          <Nav.Link  as={Link} to="/contactus">Contact Us</Nav.Link>
          <Nav.Link  as={Link} to="/blog">Blogs <BsNewspaper size={20} /></Nav.Link>
          <Nav.Link  as={Link} to="/feedback">Feedback</Nav.Link>
          <Nav.Link  as={Link} to="/FAQs">FAQs</Nav.Link>
          </Nav>
          
          <Form className={`${window.innerWidth>991 ? 'd-flex' : ''}`}>
            <Form.Control 
            
            value={searchValue}
            style={{fontSize:'1rem'}}
            onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder={searchHint[currentHint]} className={`${window.innerWidth<991 ? 'mt-2' : 'me-2'}`} aria-label="Search" />
            <FormSelect style={{fontSize:'1rem'}} className={`${window.innerWidth<991 ? 'mt-1' : ''}`} value={category}
            onChange={(e) => setCategory(e.target.value)}>
           
  <option value="" disabled >
    Select a category
  </option>
  <option value="indian">Indian</option>
  <option value="pizzas">Pizzas</option>
  <option value="burgers">Burgers</option>
  <option value="sides">Sides</option>
  <option value="beverages">Beverages</option>
          </FormSelect>
            <Button style={{fontSize:'1.1rem'}} className={`${window.innerWidth<991 ? 'mt-1' : 'ms-1'}`} onClick={handleSearch} variant="outline-success">Search</Button>
          </Form>
          <Nav bg='dark' className="d-flex" align = 'left'>
          {currUser ? (
            <NavDropdown className={`mb-1 ${window.innerWidth>991?'ms-5':''}`} title={<BsPerson  size={45} />} id="navbarDropdown" align="end">
              {currUser.isAdmin && <NavDropdown.Item  style={{fontSize:'1.2rem'}} href="/admin-dashboard">Administration</NavDropdown.Item>}
              <NavDropdown.Item  style={{fontSize:'1.2rem'}} as = {Link} to="/account">Account</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/cart">Cart</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/wishlist">Favorites</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/donate">Donate</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/help-and-support">Help and Support</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} as = {Link} to="/terms-and-conditions">Terms & Conditions</NavDropdown.Item>
              <NavDropdown.Item style={{fontSize:'1.2rem'}} onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav align = 'left' className={`mb-1 ${window.innerWidth>991?'ms-5':''}`}>
            
              <Link style={{fontSize:'1.6rem'}} className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
