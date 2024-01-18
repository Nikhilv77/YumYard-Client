import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartAction,
  deleteFromCartAction,
} from "../../Actions/CartActions";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

const CartPage = () => {
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setShowCart(true)
  }, [showCart]);
  const { currUser } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToAddress = () => {
    if (currUser) {
      navigate("/address");
    } else {
      navigate("/login");
    }
  };

  const cartState = useSelector((state) => state.cart);
  const cartItems = cartState.cartItems;
  let sum = 0;

  for (let i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].price * cartItems[i].quantity;
  }
  if(cartItems.length <= 0){
    return(
      <div
      style={{display : 'flex',height:'80vh', justifyContent:'center'}}
      >

<img src="/empty-cart.webp" style={{maxHeight:'600px',maxWidth:'500px', margin:'auto'}}></img>
      </div>
    )
  }
 
  return (
    
      <div className="mb-2 ms-2 mx-2">
      
          <div>
           
              <Row className="justify-content-center">
                <Col md={8}>
                  
                  <Card
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#F5F5F5",
                      padding: "20px",
                      marginBottom: "20px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      marginTop: "20px",
                      border: "1px solid #ddd",
                      fontFamily: "'Tinos', serif",
                      fontSize: "1.3rem",
                    }}
                  >
                    <Card.Title
                      style={{
                        fontSize: "30px",
                        fontFamily: "'Tinos', serif",

                        margin: "20px 0",
                        textAlign: "center",
                        color: "#333",
                      }}
                    >
                      My Cart
                    </Card.Title>
                    {cartItems.map((item) => (
                      <Card
                        key={item.id}
                        style={{
                          borderRadius: "15px",
                          marginBottom: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          border: "1px solid #ddd",
                        }}
                      >
                        <Row>
                          <Col md={3}>
                            <Card.Img
                              src={item.image}
                              alt={item.name}
                              style={{
                                height: "100px",
                                width: "100%",
                                objectFit: "contain",
                                borderTopLeftRadius: "15px",
                                borderBottomLeftRadius: "15px",
                                display: "block",
                                marginTop: "30px",
                                transition: "all 0.3s",
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Card.Body style={{ padding: "20px" }}>
                              <Card.Title>
                                {item.name}{" "}
                                {!item.variant ? "" : `(${item.variant})`}
                              </Card.Title>

                              <Card.Text>
                                <p>Price: ₹{item.price}</p>
                                <p>
                                  Quantity:{" "}
                                  <i
                                    className="fa-solid fa-plus"
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "5px",
                                      cursor: "pointer",
                                      transition: "color 0.3s",
                                    }}
                                    onClick={() => {
                                      if (item.quantity >= 15) {
                                        alert(
                                          "Sorry, More than 15 items cannot be added!"
                                        );
                                      } else {
                                        dispatch(
                                          addToCartAction(
                                            item.identifier,
                                            item,
                                            item.variant ? item.variant : "",
                                            1
                                          )
                                        );
                                      }
                                    }}
                                  ></i>
                                  <b
                                    style={{ color: "black", fontSize: "20px" }}
                                  >
                                    {item.quantity}
                                  </b>
                                  <i
                                    onClick={() => {
                                      if (item.quantity <= 1) {
                                        dispatch(deleteFromCartAction(item));
                                      } else {
                                        dispatch(
                                          addToCartAction(
                                            item.identifier,
                                            item,
                                            item.variant ? item.variant : "",
                                            -1
                                          )
                                        );
                                      }
                                    }}
                                    className="fa-solid fa-minus"
                                    style={{
                                      fontSize: "20px",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                      transition: "color 0.3s",
                                    }}
                                  ></i>
                                </p>
                              </Card.Text>
                            </Card.Body>
                          </Col>
                          <Col
                            md={3}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <Button
                            style={{fontSize:'1.2rem'}}
                              className="mb-4 mb-md-0"
                              variant="danger"
                              onClick={() =>
                                dispatch(deleteFromCartAction(item))
                              }
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </Card>
                </Col>
                <Col md={4}>
                <CSSTransition in={showCart} timeout={700} classNames="slide" unmountOnExit>
                  <Card
                    style={{
                      marginTop: "20px",
                      borderRadius: "15px",
                      backgroundColor: "#F5F5F5",
                      padding: "20px",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Card.Title
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "center",
                        marginBottom: "20px",
                        color: "#333",
                        fontFamily: "'Tinos', serif",
                        fontWeight: "bold",
                      }}
                    >
                      Order Summary
                    </Card.Title>
                    <Card.Text
                      style={{   fontFamily: "'EB Garamond', serif", fontSize: "1.2rem" }}
                    >
                      <p>Subtotal: ₹{sum.toFixed(2)}</p>
                      <p>Shipping: ₹20.00</p>
                      <hr />
                      <p>Total: ₹{(sum + 20).toFixed(2)}</p>
                    </Card.Text>
                    <Button
                      disabled={cartItems.length === 0}
                      variant="warning"
                      style={{
                        fontSize: "1.3rem",
                        width: "100%",
                        transition: "background 0.3s",
                        fontFamily: "'EB Garamond', serif",
                      }}
                      onClick={goToAddress}
                    >
                      Proceed to Checkout
                    </Button>
                  </Card>
                  </CSSTransition>
                </Col>
              </Row>
          </div>
      
      </div>
 
  );
                    
};

export default CartPage;
