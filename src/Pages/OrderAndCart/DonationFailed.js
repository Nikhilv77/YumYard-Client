import React, { useEffect } from "react";
import { Card, Alert,Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
export default function DonationFailed() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const Params = new URLSearchParams(location.search);
    const isFailed = Params.get("success");
  
    if (isFailed == true) {
      navigate("/404");
    }
  }, [location, navigate]);

  return (
    <div style={{display:'flex'}} className=" justify-content-center text-center mb-5 mt-5">
       <Card style={{  fontFamily: "'Tinos', serif",maxWidth: "500px", margin: "10px" }}>
        <Card.Img
          variant="top"
          style={{maxHeight:'350px'}}
          src={ "/order-failed.jpg"}
          alt="order-placed"
        />
        <Card.Body>
          <Card.Title style={{fontSize:"1.6rem"}}>Your Donation has Failed!</Card.Title>
          <Card.Text style={{fontSize:"1.2rem"}}>
            No worries! Any money debited will be transferred back within 4 hours.
          </Card.Text>
          <Button style={{fontSize:"1.2rem"}} variant="failure" onClick={()=>{navigate('/')}}>
            Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
