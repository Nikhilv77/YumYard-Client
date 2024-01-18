// LoginPage.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../Actions/LoginAction";
import Spinner from "react-bootstrap/Spinner";
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

const LoginPage = () => {
  const[requiredError,setRequiredError] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  let authEmail;
  let authPassword;
  if(location.state){
     authEmail = location.state.email
     authPassword = location.state.password;
  }
  const { loading, error } = useSelector((state) => state.login);
  const isLoggedIn = useSelector((state) => state.login);
  const [email, setEmail] = useState(authEmail || "");
  const [password, setPassword] = useState(authPassword||"");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn.currUser) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    if(!email.trim() || !password.trim()){
     setRequiredError(true)
     setTimeout(()=>{setRequiredError(false)},2000)
     return;
    }

  
    const loginInfo = {
      email:email.trim(),
      password:password.trim(),
    };
    dispatch(LoginAction(loginInfo,loginFunction));
  };
 const loginFunction = ()=>{
  navigate('/')
 }
  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card style={{ fontFamily: "'Tinos', serif",fontSize:'1.2rem'}} className="p-4 shadow rounded mt-5 mb-5">
          {requiredError && (
              <Alert style={{fontSize:'1.2rem'}} variant="warning">Please enter both email and password.</Alert>
            )}
            {error && (
              <Alert style={{fontSize:'1.2rem'}} variant="danger">{error.response.data.message}</Alert>
            )}
            <h2 style={{fontSize:'2.3rem'}} className="text-center mb-4">Login</h2>
            <Form>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Form.Control
                style={{fontSize:'1.2rem'}}
                required
                  type="text"
                  placeholder="Enter email or Mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-2" controlId="formBasicPassword">
                <Form.Control
                style={{fontSize:'1.2rem'}}
                required
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
              style={{fontSize:'1.2rem'}}
                className="mt-4"
                variant="primary"
                type="button"
                onClick={handleLogin}
                block
                disabled = {loading}
              >
                {loading? <>
            <Spinner animation="border" size="sm" /> Logging in...
          </>:'Login'}
              </Button>
            
              <p className="text-center mt-3">
                <Link
                  to="/forgot-password"
                  style={{ color: "#007BFF", textDecoration: "none" }}
                >
                  Forgot your password?
                </Link>
              </p>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#007BFF", textDecoration: "none" }}
                >
                  Sign up here
                </Link>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
