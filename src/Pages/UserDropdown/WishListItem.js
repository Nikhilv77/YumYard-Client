
import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { deleteFromWishlistAction } from "../../Actions/WishlistActions";
import { addToCartAction } from "../../Actions/CartActions";
import {FaTrashAlt} from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa';
import { CSSTransition } from "react-transition-group";

const WishlistItem = ({ item }) => {
  const [isClicked,setIsClicked] = useState(false)
  const [showIcon,setShowIcon] = useState(false)
  useEffect(()=>{
    setShowIcon(true)
  },[])
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = () => {
    dispatch(deleteFromWishlistAction(item));
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const existingItem = cartItems.find(
    (cartItem) => cartItem._id === item._id
  );
  let itemQuantity = 0;
  if (existingItem) {
    itemQuantity = +existingItem.quantity;
  }
  console.log(itemQuantity);

  const sendToCart = () => {
    setIsClicked(true)
    setTimeout(()=>{
      setIsClicked(false)
    },300)
    if (+itemQuantity + 1 > 15) {
      alert("You can not add more than 15 items");
    } else {
      if(item.identifier === 'pizza'){
          dispatch(addToCartAction(item.identifier,item, "small", 1));
      }else{
         dispatch(addToCartAction(item.identifier,item,"",1));
      }
    }
  };

  return (
    <Card key={item.id} style={{ borderRadius: "15px", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", border: "1px solid #ddd" }}>
      <Row>
        <CSSTransition
        in = {showIcon}
        timeout={1000}
        classNames='slide'
        unmountOnExit
        >
        <Col md={3}>
          <Card.Img src={item.image} alt={item.name} style={{ height: "100px", width: "100%", objectFit: "contain", borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px", display: "block", transition: "all 0.3s" }} />
        </Col>
        </CSSTransition>
       
        <Col md={6}>
          <Card.Body style={{ padding: "20px" }}>
            <Card.Title style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{item.name}</Card.Title>
            <Card.Text>
              <p style={{ margin: 0, color: "#555",fontSize:'1.3rem' }}>Price: ₹{item.price}</p>
            </Card.Text>
          </Card.Body>
        </Col>
      
        <CSSTransition
        in = {showIcon}
        timeout={1000}
        classNames='slideY'
        unmountOnExit
        >
        <Col md={3} className="d-flex align-items-center justify-content-center">
            <FaShoppingCart
             size={27}
             className={`mb-4 mb-md-0 m-1 shopping-cart-favorites ${isClicked?'clicked':''}`}
             onClick={sendToCart}>Add To Cart</FaShoppingCart>
          <FaTrashAlt
          size={22}
            className="mb-4 mb-md-0 m-1 m-1 trash-icon"
            onClick={handleRemoveFromWishlist}
          >
            Remove
          </FaTrashAlt>
        </Col>
        </CSSTransition>
      </Row>
    </Card>
  );
};

export default WishlistItem;
