import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../Actions/CartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { deleteFromWishlistAction,addToWishlistAction } from "../../Actions/WishlistActions";
export default function Burger({ burger }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const price = burger.price;
  const [isFavorite, setIsFavorite] = useState(false);
  const wishlistItems = useSelector(state=>state.wishlist.wishlistItems);
  useEffect(()=>{
    const isItemInWishlist = wishlistItems.find(item => item._id === burger._id);
    if(isItemInWishlist){
      setIsFavorite(true)
    }
  },[isFavorite,burger._id,wishlistItems])
  const handleClose = () => setShow(false);

  const handleShow = (e) => {
    // Check if the clicked element is a select, ADD button, or wishlist button
    
    const isSelectOrButtonOrWishlist =
    e.target.tagName === "SELECT" ||
      (e.target.tagName === "BUTTON" && e.target.textContent === "ADD");

    // Open the modal only if the clicked element is not a select, ADD button, or wishlist button
    if (!isSelectOrButtonOrWishlist) {
      setShow(true);
    }
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const item = cartItems.find(
    (cartItem) => cartItem._id === burger._id
  );
  let itemQuantity = 0;
  if (item) {
    itemQuantity = +item.quantity;
  }

  const sendToCart = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
    if (+itemQuantity + +quantity > 15) {
      alert("You can not add more than 15 items");
    } else {
      dispatch(addToCartAction("burger",burger,"",quantity));
    }
  };

  const wishlistHandler = () => {
    if(isFavorite){
      setIsFavorite(false)
      dispatch(deleteFromWishlistAction(burger))
    }else{
      setIsFavorite(true);
   
      dispatch(addToWishlistAction("burger",burger))
    }
  };


  
  const [isClicked, setIsClicked] = useState(false);
  
    

  return (
    <div
    style={{  fontFamily: "'EB Garamond', serif",fontSize : '1.5rem'}}
      className="shadow-lg p-3 mb-5 bg-white rounded m-2 product-card"
      // Move the onClick handler to the outer div
    >
      <div className="text-start" >
        <FontAwesomeIcon
          onClick={wishlistHandler}
          style={{ fontSize: '20px' }}
          icon={faHeart}
          color={isFavorite ? "#ce2029" : "gray"}
        />
      </div>
      <div onClick={handleShow} >
          <span style={{ display: 'block', textAlign: 'center' }}>{burger.name}</span>
  
          <img
            src={burger.image}
            className="img-fluid"
            style={{ height: "200px", width: "200px", margin: "0 auto" }}
            alt={burger.name}
          />
        </div>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={handleShow}
      >
        <div className="quantity-selection">
          <p>Quantity</p>
          <select
           style={{  fontFamily: "'EB Garamond', serif", fontSize : '1.2rem'}}
            className="form-control form-control-sm"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={handleShow}
      >
        <div className="m-1 w-50">
          <p
            className="mt-1 text-start"
            style={{ color: "#303234", fontSize: "1.3rem" }}
          >
            {price * quantity} Rs/-
          </p>
        </div>

        <div className="m-1 w-50 text-end" onClick={handleShow}>
          <button className={`btn ${isClicked?'clicked':''}`}onClick={sendToCart}>
            ADD
          </button>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{  fontFamily: "'EB Garamond', serif",fontSize:'2rem', margin:'auto',color:'#333'}}>{burger.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{  fontFamily: "'EB Garamond', serif"}}>
          <img
            src={burger.image}
            className="img-fluid"
            style={{ height: "400px", margin: "30px" }}
            alt={burger.name}
          />
          <p style={{  fontFamily: "'EB Garamond', serif",fontSize : '1.3rem',color:'#333'}}>{burger.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button style={{  fontFamily: "'EB Garamond', serif",fontSize:'20px'}} className="btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
