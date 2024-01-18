import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { userRegAction } from "../Actions/UserRegActions";
import { useNavigate } from "react-router-dom";
import Success from "./Success";
import Spinner from "react-bootstrap/Spinner";
const SignupAuthInput = ({ oneTP, user }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState();
  const otp = oneTP.otp;
  const [invalidOTP, setInvalidOTP] = useState(false);
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.user);

  const handleAuthentication = () => {
    if (parseInt(inputValue) === otp) {
      const newUser = {
        name: user.name,
        email: user.email,
        number: user.number,
        password: user.password,
      };
      dispatch(userRegAction(newUser));
    } else {
      setInvalidOTP(true);
      setTimeout(() => {
        setInvalidOTP(false);
      }, 2000);
    }
  };

  return (
    <div>
      <Form.Group
        style={{  fontFamily: "'Tinos', serif"}}
        className="mt-3"
        controlId="formOTP"
      >
        <Form.Control
          type="number"
          style={{ fontSize: "1.2rem" }}
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
        {loading ? 
          
            <><Spinner animation="border" size="sm"/>Signing in...</>
           
       
         : (
          "Sign Up"
        )}
      </Button>
      <div className="mt-3">
        {success && navigate("/login", { state: user })}
      </div>

      {invalidOTP && (
        <Alert style={{ fontSize: "1.2rem" }} className="mt-3" variant="danger">
          Invalid OTP
        </Alert>
      )}
    </div>
  );
};

export default SignupAuthInput;
