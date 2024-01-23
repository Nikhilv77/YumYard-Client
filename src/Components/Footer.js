import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const EnhancedFooter = () => {
  return (
    <footer style={{ backgroundColor: "#222", color: "#fff", padding: "40px 0", fontFamily: "Poppins, sans-serif" }}>
      <Container>
        <Row>
          <Col md={4}>
            <h4 style={{ marginBottom: "20px" }}>Get In Touch With Us</h4>
            <p style={{ marginBottom: "10px" }}>Email: YumYard@yumyard.com</p>
            <p>Phone: +91 7208291301</p>
          </Col>
          <Col md={4}>
            <h4 style={{ marginBottom: "20px" }}>Quick Links</h4>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}><a href="/" style={{ color: "#bbb", textDecoration: 'none' }}>Home</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/products" style={{ color: "#bbb", textDecoration: 'none' }}>Products</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/aboutus" style={{ color: "#bbb", textDecoration: 'none' }}>About Us</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/contactus" style={{ color: "#bbb", textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h4 style={{ marginBottom: "20px" }}>Follow Us</h4>
            <p style={{ marginBottom: "10px", color: "#bbb" }}>Stay connected on social media</p>
            <div>
              <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: "15px", color: "#3b5998", textDecoration: 'none' }}>
                <FaFacebook size={30} />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: "15px", color: "#00acee", textDecoration: 'none' }}>
                <FaTwitter size={30} />
              </Link>
              <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ marginRight: "15px", color: "#e4405f", textDecoration: 'none' }}>
                <FaInstagram size={30} />
              </Link>
              <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0077b5", textDecoration: 'none' }}>
                <FaLinkedin size={30} />
              </Link>
            </div>
          </Col>
        </Row>
        <hr style={{ borderTop: "1px solid #444" }} />
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#888" }}>© 2023 YumYard. All rights reserved.</p>
        <p style={{ textAlign: "center", marginTop: "5px", fontSize: "14px", color: "#888" }}>Made by Nikhil Verma.</p>
      </Container>
    </footer>
  );
};

export default EnhancedFooter;

