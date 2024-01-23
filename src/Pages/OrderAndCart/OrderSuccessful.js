import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { saveThroughSession } from "../../Actions/OrderAction";

const OrderSuccessful = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const transactionId = params.get("session_id")
    if(!transactionId){
      navigate('/404')
    } 
    if(transactionId){
      dispatch(saveThroughSession(transactionId))
    }
  },[location,navigate])
  return (
    <div className="text-center">
     

      <Card style={{ width: "500px", margin: "30px auto", fontFamily: "'Tinos', serif", fontSize:'1.2rem' }}>
        <Card.Img
          variant="top"
          src={process.env.PUBLIC_URL + "/order-successful.jpg"}
          alt="order-placed"
        />
        <Card.Body>
          <Card.Title style={{fontSize:'1.4rem',fontWeight:'bold'}}>Your Order is Successfull!</Card.Title>
          <Card.Text>
            Thank you for choosing us. Your order is being prepared and will be
            delivered shortly. In the meantime, enjoy the celebration!
          </Card.Text>
          <Button variant="success" onClick={()=>{navigate('/orders')}}>
            Track Order
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderSuccessful;
