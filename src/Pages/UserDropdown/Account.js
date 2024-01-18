import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { removeUser, updatePasswordAction } from "../../Actions/UserRegActions";
import ClipLoader from "react-spinners/ClipLoader";
import { getUserByEmail } from "../../Actions/UserRegActions";
import { CSSTransition } from "react-transition-group";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import ConfirmForDelete from "../../Components/ConfirmForDelete";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const { currUser } = useSelector((state) => state.login);
  useEffect(() => {
    if(!currUser){
      navigate('/login')
      return
    }
    setShowAccount(true);
  }, [currUser,navigate]);
  const {
    removedLoading,
    success: removedSuccess,
    removedError,
  } = useSelector((state) => state.removeUser);
  const { loading, success, error } = useSelector(
    (state) => state.updatePassword
  );
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  useEffect(() => {
    if (!currUser) {
      navigate("/login");
      return
    }
    dispatch(getUserByEmail({ email: currUser.email }));
  }, [currUser, success]);
  const {
    User,
    loading: firstLoading,
    error: firstError,
  } = useSelector((state) => state.getUserByEmail);

  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const handlePasswordUpdate = () => {
    dispatch(
      updatePasswordAction({ email: User.email, password: newPassword })
    );
  };

  if (success) {
    setTimeout(() => {
      dispatch({ type: "RESET_UPDATE_PASSWORD" });
    }, 2000);
  }
  return (
    <div style={{ minHeight: "90vh" }}>
      <CSSTransition
        in={showAccount}
        timeout={700}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="container mt-5 mb-5"
          style={{ maxWidth: "900px",  fontFamily: "'Tinos', serif" }}
        >
          {/* {firstLoading && <ClipLoader size={50}></ClipLoader>} */}

          <Card style={{ borderRadius: "10px" }}>
            <Card.Body>
              {loading && <ClipLoader size={50}></ClipLoader>}
              {error && (
                <Alert style={{ fontSize: "1.3rem" }} variant="danger">
                  Something went wrong
                </Alert>
              )}
              {removedError && (
                <Alert style={{ fontSize: "1.3rem" }} variant="danger">
                  Something went wrong
                </Alert>
              )}
              {firstError && (
                <Alert variant="danger">
                  <h4>Something went wrong</h4>
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  <h4>Password updated successfully</h4>
                </Alert>
              )}
              <Card.Title className="mb-4">
                {" "}
                <h2>Account Information</h2>
              </Card.Title>
              <Form>
                <div className="form-group row mb-3">
                  <Form.Label
                    style={{ fontSize: "1.2rem" }}
                    className="col-sm-3 col-form-label text-right"
                  >
                    User Name
                  </Form.Label>
                  <div className="col-sm-9">
                    <Form.Control
                      style={{ fontSize: "1.2rem" }}
                      type="text"
                      value={User.name}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <Form.Label
                    style={{ fontSize: "1.2rem" }}
                    className="col-sm-3 col-form-label text-right"
                  >
                    Password
                  </Form.Label>

                  <div className="col-sm-9">
                    <InputGroup>
                      <FormControl
                        style={{ fontSize: "1.2rem" }}
                        type={showPassword ? "text" : "password"}
                        value={User.password}
                        readOnly
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={22} />
                        ) : (
                          <FaEye size={22} />
                        )}
                      </Button>
                    </InputGroup>
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <Form.Label
                    style={{ fontSize: "1.2rem" }}
                    className="col-sm-3 col-form-label text-right"
                  >
                    New Password
                  </Form.Label>
                  <div className="col-sm-9">
                    <Form.Control
                      style={{ fontSize: "1.2rem" }}
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  style={{ fontSize: "1.2rem" }}
                  variant="primary"
                  onClick={handlePasswordUpdate}
                >
                  Update Password
                </Button>
              </Form>

              <hr className="my-4" />

              <Card.Title className="mb-4">
                <h3>Contact Information</h3>
              </Card.Title>
              <Form>
                <div className="form-group row mb-3">
                  <Form.Label
                    style={{ fontSize: "1.2rem" }}
                    className="col-sm-3 col-form-label text-right"
                  >
                    Phone Number
                  </Form.Label>
                  <div className="col-sm-9">
                    <Form.Control
                      style={{ fontSize: "1.2rem" }}
                      type="text"
                      value={User.number}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mb-3">
                  <Form.Label
                    style={{ fontSize: "1.2rem" }}
                    className="col-sm-3 col-form-label text-right"
                  >
                    Email
                  </Form.Label>
                  <div className="col-sm-9">
                    <Form.Control
                      style={{ fontSize: "1.2rem" }}
                      type="email"
                      value={User.email}
                      readOnly
                    />
                  </div>
                </div>
                <Button
                  style={{ fontSize: "1.2rem" }}
                  variant="primary"
                  onClick={() => {
                    setShowDialog(!showDialog);
                  }}
                >
                  Delete Account
                </Button>
              </Form>
              {showDialog && (
                <ConfirmForDelete
                  message="Are you sure?"
                  onYes={() => {
                    dispatch(removeUser(User._id));
                    setShowDialog(!showDialog);
                  }}
                  onNo={() => {
                    setShowDialog(!showDialog);
                  }}
                ></ConfirmForDelete>
              )}
            </Card.Body>
          </Card>
        </div>
      </CSSTransition>
    </div>
  );
};

export default AccountPage;
