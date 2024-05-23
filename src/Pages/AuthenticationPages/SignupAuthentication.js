import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { forgotPasswordAction } from "../../Actions/forgotPasswordAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import SignupAuthInput from "../../Components/SignupAuthInput";

const SignupAuthentication = () => {
  const location = useLocation();
  const user = location.state;
  const email = user.email;
  const { otp, loading, error } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validateEmailAndDispatchAction = async () => {
    try {
      const response = await axios.post("https://yumyard-server-erfw.onrender.com/api/users/doesnotexist", { email });
      setOtpSent(true);
      setShowOTPInput(true);
      const oneTimePassword = Math.floor(Math.random() * 9000 + 1000);
      dispatch(forgotPasswordAction({ oneTimePassword, email }));
    } catch (error) {
      setShowOTPInput(false);
    }
  };

  return (
    <Container className="mb-5 mt-5">
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className="text-start">
          <Card
            style={{  fontFamily: "'Tinos', serif" }}
            className="p-4 shadow rounded mt-5 mb-5"
          >
            <h2 className="text-center mb-4">Verify Email</h2>

            <Form>
              <Form.Group controlId="formEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  style={{ fontSize: "1.2rem" }}
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                />
              </Form.Group>

              <Button
                className="mt-3"
                style={{ fontSize: "1.2rem" }}
                variant="primary"
                type="button"
                onClick={validateEmailAndDispatchAction}
                disabled={loading} 
              >
                {loading ? (
                  <span>
                    <Spinner animation="border" size="sm" /> Sending...
                  </span>
                ) : otpSent ? (
                  "Send Again"
                ) : (
                  "Send OTP"
                )}
              </Button>

              {showOTPInput && otp && (
                <SignupAuthInput oneTP={otp} user={user}></SignupAuthInput>
              )}
              {error && (
                <Alert
                  style={{ fontSize: "1.2rem" }}
                  className="mt-3"
                  variant="danger"
                >
                  Could not send OTP, Something went wrong!
                </Alert>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupAuthentication;
