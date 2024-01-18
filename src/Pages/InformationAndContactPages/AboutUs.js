// AboutUsPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

const AboutUsPage = () => {
  const [showImage,setShowImage] = useState(false);
  useEffect(()=>{
    setShowImage(true)
  },[])
  return (

      <Card style={{fontFamily:'Gamarond', padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)" }}>
        <Card.Title>
          <h2 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>About Us</h2>
        </Card.Title>
        <Card.Body>
          <Row>
            <Col md={6} style={{ textAlign: "justify" }}>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                <strong>Welcome to YumYard Meals!</strong> We are a passionate team of culinary enthusiasts dedicated to delivering exceptional dining experiences.
              </p>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                <strong>Our Journey:</strong> It all started with a shared love for good food and the belief that every meal should be an adventure. From our humble beginnings, we've grown into a community-driven restaurant, serving a diverse menu crafted with care and creativity.
              </p>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                <strong>Our Values:</strong> At YumYard, we believe in quality, innovation, and sustainability. We source the finest ingredients, embrace culinary creativity, and prioritize sustainability in every aspect of our operation.
              </p>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                <strong>Our Commitment to Quality:</strong> At YumYard, we strive for excellence in every dish. Our chefs carefully select and prepare each ingredient to ensure a delightful and satisfying experience for our customers.
              </p>
           
           
            </Col>
            <Col md={6}>
             <div style={{position:'relative'}}>
              <CSSTransition in = {showImage}
              timeout={700}
              classNames="slideLess"
              unmountOnExit
              >

              <img src="/restraunt-2.jpg" alt="About Us 2" style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginTop: '10px' }} />
              </CSSTransition>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col md={12} style={{ textAlign: "justify" }}>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                <strong>Connect with Us:</strong> Follow us on social media to stay updated on the latest news, events, and mouth-watering dishes.
              </p>
              <div style={{ fontSize: "1.8rem", marginTop: "20px", display: "flex", justifyContent: "center" }}>
                <a href="https://www.facebook.com" target="_blank" style={{ margin: "0 15px" }}>
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" style={{ margin: "0 15px" }}>
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com" target="_blank" style={{ margin: "0 15px" }}>
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com" target="_blank" style={{ margin: "0 15px" }}>
                  <FaLinkedinIn />
                </a>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  );
};

export default AboutUsPage;
