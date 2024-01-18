import React, { useEffect, useState } from "react";
import AddrForm from "./AddrForm";
import Map from "./Map";
import Card from "react-bootstrap/Card";
import "mapbox-gl/dist/mapbox-gl.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orderAction } from "../../Actions/OrderAction";

export default function AddrPage() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const currUser = useSelector((state) => state.login.currUser);
    useEffect(()=>{
        if(!currUser||cartItems.length===0){
            navigate('/404')
        }
    },[currUser])

  const navigate = useNavigate();
  const [address, setAddress] = useState({
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "28.61283",
    longitude: "77.22925649999999",
  });
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const requiredFields = [
    "streetAndNumber",
    "place",
    "region",
    "postcode",
    "country",
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const areAllFieldsFilled = requiredFields.every(
      (field) => address[field].trim() !== ""
    );

    if (areAllFieldsFilled) {
      setShowAlert(false);
      const userAddress = {
        streetAddress: address.streetAndNumber,
        pincode: address.postcode,
        city: address.place,
        state: address.region,
        country: address.country,
      };
      const body = {
        cartItems,
        currUser,
        totalPrice,
        userAddress,
      };
        dispatch(orderAction(body));
      
    } else {
      setShowAlert(true);
    }
  };

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  return (
      <Card >
        <Card.Header style={{  fontFamily: "'Tinos', serif",fontSize: "2rem", color: "#333"}}>
          {address.streetAndNumber
            ? `Selected Address: ${address.streetAndNumber}`
            : "Enter Your Address"}
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mt-5 mb-5">
              <AddrForm
                onSubmit={handleFormSubmit}
                address={address}
                setAddress={setAddress}
              />
            </Col>
            <Col md={6} className="mt-5 mb-5">
              <Map
                longitude={address.longitude}
                latitude={address.latitude}
                updateCoordinates={updateCoordinates}
              />
            </Col>
          </Row>
        </Card.Body>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Please fill in all the required fields!
          </Alert>
        )}
      </Card>

  );
}
