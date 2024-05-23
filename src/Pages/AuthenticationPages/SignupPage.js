import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import SignupAuthentication from "./SignupAuthentication";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
const SignupPage = () => {
  const navigate = useNavigate();
  const signupState = useSelector((state) => state.user);
  const { loading, success, error } = signupState;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [cPass, setCPass] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [validationError, setValidationError] = useState("");
  const [doesNotExist, setDoesNotExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    if (!number || isNaN(number) || number.length !== 10) {
      setValidationError("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setValidationError("Password should be at least 6 characters long");
      return false;
    }
    return true;
  };
  const confirmPassword = () => {
    if (password !== cPass) {
      setValidationError("Password and Confirm Password must match.");
      return false;
    }
    return true;
  };
  const sendData = async () => {
    setDoesNotExist(true);
    setValidationError("");

    if (
      !validateEmail() ||
      !validatePhoneNumber() ||
      !validatePassword() ||
      !confirmPassword()
    ) {
      return;
    }

    const user = {
      name,
      email,
      number,
      password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post("https://yumyard-server-erfw.onrender.com/api/users/doesnotexist", user);
      setIsLoading(false);
      navigate("/signupAuth", { state: user });
    } catch (error) {
      setDoesNotExist(false);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className="text-start">
          <Card style={{ fontFamily: "'Tinos', serif"}} className="p-4 shadow rounded mb-5 mt-5">
           
            {!doesNotExist && (
              <Alert style={{fontSize:'1.2rem'}} variant="warning">
                User already exists, Please login!
              </Alert>
            )}
            {validationError && (
              <Alert style={{fontSize:'1.2rem'}} variant="danger">{validationError}</Alert>
            )}
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Control
               
                  style={{ marginTop: "5px" ,fontSize:'1.2rem'}}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  style={{ marginTop: "5px",fontSize:'1.2rem' }}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formNumber">
                <Form.Control
                  style={{ marginTop: "5px",fontSize:'1.2rem' }}
                  type="text"
                  placeholder="Mobile no."
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Control
                  style={{ marginTop: "5px",fontSize:'1.2rem' }}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPass(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Control
                  style={{ marginTop: "5px",fontSize:'1.2rem' }}
                  type="password"
                  placeholder="Confirm Password"
                  value={cPass}
                  onChange={(event) => setCPass(event.target.value)}
                />
              </Form.Group>

              <Button
                className="mt-3"
                style={{fontSize:'1.2rem'}}
                variant="primary"
                type="button"
                onClick={sendData}
                block
                disabled={loading}
              >
               {isLoading ? (
          <>
            <Spinner animation="border" size="sm" /> Verifying...
          </>
        ) : (
          "Sign Up"
        )}

              </Button>

              <p style={{fontSize:'1.2rem'}} className="text-center mt-3">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#007BFF", textDecoration: "none" }}
                >
                  Login here
                </Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
