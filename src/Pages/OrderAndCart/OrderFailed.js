import React, { useEffect } from "react";
import { Card, Alert,Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
export default function OrderFailed() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const Params = new URLSearchParams(location.search);
    const isFailed = Params.get("success");
    console.log(isFailed!==false);
    if (isFailed == true) {
      navigate("/404");
    }
  }, [location, navigate]);

  return (
    <div className="text-center">
       <Card style={{ width: "500px", margin: "30px auto", fontFamily: "'Tinos', serif",fontSize:'1.2rem' }}>
        <Card.Img
          variant="top"
          style={{height:'400px'}}
          src={ "/order-failed.jpg"}
          alt="order-placed"
        />
        <Card.Body>
          <Card.Title style={{fontSize:'1.4rem',fontWeight:'bold'}}>Your Order has Failed!</Card.Title>
          <Card.Text>
            Any money debited will be transferred back within 4 hours!
          </Card.Text>
          <Button style={{fontSize:'1.2rem'}} variant="failure" onClick={()=>{navigate('/cart')}}>
            Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
