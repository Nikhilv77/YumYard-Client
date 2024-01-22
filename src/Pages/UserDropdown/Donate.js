import React, { useEffect, useState } from "react";
import { Container, Form, Button, Image, Card, Alert,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { donationAction } from "../../Actions/DonationActions";
import { CSSTransition } from "react-transition-group";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const DonatePage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { loading, success, error } = useSelector((state) => state.Donate);

  const [donationAmountError, setDonationAmountError] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const { currUser } = useSelector((state) => state.login);

  useEffect(() => {
    if (!currUser) {
      navigate("/404");
      return;
    }
    setShowDonation(true);
  }, [donationAmountError, loading, currUser, navigate]);

  const dispatch = useDispatch();
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState(""); // Separate state for custom amount
  
  if(!currUser){
    navigate('/404');
    return;
  }
  const { name, email, number } = currUser;

  const handleDonation = async () => {
  
    const body = {
      name: name,
      email: email,
      number: number,
      donationAmount:
        donationAmount === "custom" ? +customAmount : +donationAmount,
    };
    if (body.donationAmount < 1) {
      setDonationAmountError(true);
      setTimeout(() => {
        setDonationAmountError(false);
      }, 3000);
      return;
    }
    console.log(body);

    dispatch(donationAction(body));
  };

  return (
    <Container
      style={{ minHeight: "80vh" }}
      className="mt-5 d-flex justify-content-center align-items-center mb-5"
    >
      <CSSTransition
        in={showDonation}
        timeout={700}
        classNames="fade"
        unmountOnExit
      >
        <Card
          className="mt-3 mb-3"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "10px",
            fontFamily: "Times Roman",
          }}
        >
          <Card.Body>
            <Card.Title>
              <h2>Donate to Feed Poor kids</h2>
            </Card.Title>
            <Card.Text>
              <p style={{ fontSize: "1.2rem" }}>
                Your contribution can make a significant impact in providing
                meals to children and supporting those in need.
              </p>
            </Card.Text>
            <Image
              src="/donate.jpg"
              alt="Donate Image"
              fluid
              className="mb-3"
            />

            <Form>
              <Form.Group controlId="donationAmount">
                <Form.Label
                  style={{ fontSize: "1.2rem" }}
                  htmlFor="donationAmount"
                >
                  Select Donation Amount
                </Form.Label>
                <Form.Control
                  style={{ fontSize: "1.2rem" }}
                  as="select"
                  id="donationAmount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="50">50 Rupees</option>
                  <option value="100">100 Rupees</option>
                  <option value="200">200 Rupees</option>
                  <option value="500">500 Rupees</option>
                  <option value="custom">Custom Amount</option>
                </Form.Control>
                {donationAmount === "custom" && (
                  <Form.Control
                    style={{ fontSize: "1.2rem" }}
                    type="text"
                    placeholder="Enter amount"
                    className="mt-2"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                )}
              </Form.Group>

              <Button
                style={{ fontSize: "1.2rem" }}
                className={`mt-2 btn ${"button"} ${isClicked ? "clicked" : ""}`}
                variant="primary"
                onClick={handleDonation}
                disabled={loading}
              >
               {loading?<>Donating...<Spinner size = "sm" animation = "border"/></>:'Donate'}
              </Button>
            </Form>
            {error && (
              <Alert
                style={{ fontSize: "1.2rem" }}
                variant="danger"
                className="mt-3"
              >
                Something went wrong!
              </Alert>
            )}
            {donationAmountError && (
              <Alert
                style={{ fontSize: "1.2rem" }}
                variant="warning"
                className="mt-3"
              >
                Amount should be more than &#8377;0
              </Alert>
            )}
          </Card.Body>
        </Card>
      </CSSTransition>
    </Container>
  );
};

export default DonatePage;
