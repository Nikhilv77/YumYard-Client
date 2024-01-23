import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LoginAction } from "../Actions/LoginAction";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ oneTP, loginInfo }) => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("");
  const otp = oneTP.otp;
  const password = loginInfo.password;
  const email = loginInfo.email;
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const loginFunction = ()=>{
    navigate('/')
   }
  const handleAuthentication = async () => {
    setInvalidOTP(false);
    setLoading(true);

    try {
      if (parseInt(inputValue) === otp) {
        const AuthInfo = {
          email,
          password,
        };
         dispatch(LoginAction(AuthInfo,loginFunction));
      } else {
        setInvalidOTP(true);
        setTimeout(() => {
          setInvalidOTP(false);
        },1000);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setInvalidOTP(true);
      setInvalidOTP(true);
      setTimeout(() => {
        setInvalidOTP(false);
      },1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form.Group className="mt-3" controlId="formOTP">
        <Form.Control
          style={{ fontSize: "1.2rem" }}
          type="number"
          placeholder="Enter OTP"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </Form.Group>
      <Button
        style={{ fontSize: "1.2rem" }}
        onClick={handleAuthentication}
        className="mt-3"
        variant="primary"
        type="button"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Verifying...
          </>
        ) : (
          "Login"
        )}
      </Button>
      {invalidOTP && (
        <Alert style={{ fontSize: "1.2rem" }} className="mt-3" variant="danger">
          Invalid OTP
        </Alert>
      )}
    </div>
  );
};

export default OTPInput;
