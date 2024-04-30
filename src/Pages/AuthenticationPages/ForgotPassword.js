import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { generateEmailOTP } from "../actions/otpActions";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { forgotPasswordAction } from "../../Actions/forgotPasswordAction";
import { useSelector } from "react-redux";
import OTPInput from "../../Components/OTPInput";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Spinner from "react-bootstrap/Spinner";

const ForgetPasswordPage = () => {
  const { otp, loading, error } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [loginInfo, setLoginInfo] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const validateEmailAndDispatchAction = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      try {
        const response = await axios.post("https://yumyard-server.onrender.com/api/users/doesexist", { email });
        setLoginInfo(response.data);
        setEmailIsValid(true);
        setOtpSent(true);
        setShowOTPInput(true);
        const oneTimePassword = Math.floor(Math.random() * 9000 + 1000);
        dispatch(forgotPasswordAction({ oneTimePassword, email }));
      } catch (error) {
        setEmailIsValid(false);
        setShowOTPInput(false);
      }
    } else {
      setEmailIsValid(false);
      setShowOTPInput(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5 mb-5">
        <Col md={6} className="text-start">
          <Card
            style={{  fontFamily: "'Tinos', serif" }}
            className="p-4 shadow rounded mt-5 mb-5"
          >
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form>
              <Form.Group controlId="formEmail">
         
                <Form.Control
                  style={{ fontSize: "1.2rem" }}
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                {otpSent ? (
                  loading ? (
                    <>
                    <Spinner animation="border" size="sm" /> Sending...</>
                  ) : (
                    "Send Again"
                  )
                ) : loading ? (
                  <>
                  <Spinner animation="border" size="sm" /> Sending...</>
                ) : (
                  "Send OTP"
                )}
              </Button>
              {!emailIsValid && (
                <Alert style={{fontSize:'1.2rem'}} className="mt-3" variant="warning">
                  {" "}
                  Please enter a valid email address and make sure the account
                  exists!
                </Alert>
              )}
              {showOTPInput && otp && loginInfo.email && (
                <OTPInput oneTP={otp} loginInfo={loginInfo} />
              )}
              {error && (
                <Alert style={{fontSize:'1.2rem'}} className="mt-3" variant="danger">
                  Could not send OTP, Something went wrong!
                </Alert>
              )}

              <div className="mt-3">
                <p style={{ fontSize: "1.2rem" }}>
                  (You can reset your password once logged in)
                </p>
              
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPasswordPage;
