import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import PropTypes from "prop-types";
import { Form, Button, Card, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";


AddrForm.propTypes = {
  address: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

const cardStyle = {
  width: "100%",
  maxWidth: "400px",
  margin: "20px auto",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Tinos', serif",

};

const buttonsContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  
};

export default function AddrForm({ address, onSubmit, setAddress }) {
  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };
 const{loading,success,error} = useSelector((state)=>state.order.order)

  return (
    <Card style={cardStyle}>
      <Form onSubmit={onSubmit}>
        <AutoCompleteInput
          setAddress={setAddress}
          handleManualInputChange={handleManualInputChange}
          streetAndNumber={address.streetAndNumber}
        />

        <Form.Group as={Col} className="mb-4" controlId="formCity">
          <Form.Control
           style={{  fontSize:'1.1rem'}}
            type="text"
            placeholder="City"
            value={address.place}
            onChange={(event) => handleManualInputChange(event, "place")}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-4" controlId="formRegion">
          <Form.Control
          style={{  fontSize:'1.1rem'}}
            type="text"
            placeholder="State/Province/Region"
            value={address.region}
            onChange={(event) => handleManualInputChange(event, "region")}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-4" controlId="formPostcode">
          <Form.Control
          style={{  fontSize:'1.1rem'}}
            type="text"
            placeholder="Postcode"
            value={address.postcode}
            onChange={(event) => handleManualInputChange(event, "postcode")}
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-4" controlId="formCountry">
          <Form.Control
          style={{  fontSize:'1.1rem'}}
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(event) => handleManualInputChange(event, "country")}
          />
        </Form.Group>

        <div style={buttonsContainerStyle}>
          <Button style={{fontSize:'1rem'}} type="submit" variant="primary" disabled = {loading}>
           {loading?<><Spinner size="sm" animation="border"/></>:'Pay Now'}
          </Button>
          <Button
          style={{fontSize:'1rem'}}
            type="reset"
            variant="secondary"
            onClick={() =>
              setAddress({
                streetAndNumber: "",
                place: "",
                region: "",
                postcode: "",
                country: "",
                latitude: "28.61283",
                longitude: "77.22925649999999",
              })
            }
          >
            Reset
          </Button>
        </div>
      </Form>
    </Card>
  );
}

