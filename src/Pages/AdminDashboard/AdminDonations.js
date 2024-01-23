import React, { useEffect, useState, useMemo } from "react";
import Pagination from "../../Components/PaginationForAdmin";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonations } from "../../Actions/DonationActions";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import "./AdminDonations.css";
const AdminDonations = () => {
  
  const [currPage, setCurrPage] = useState(1);
  const { success } = useSelector((state) => state.Donate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDonations());
  }, [success]);
  const { Donations, loading, error } = useSelector(
    (state) => state.allDonations
  );
  const sortedDonations = useMemo(
    () =>
      Donations && Donations.length > 0
        ? Donations.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        : [],
    [Donations]
  );
  if (loading) {
    return (
      <div>
        <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
        >
          <Alert
            className="m-auto"
            style={{ maxWidth: "300px" }}
            variant="danger"
          >
            Something went wrong!
          </Alert>
        </div>
      </div>
    );
  }

  if (!loading && !error && Donations.length < 1) {
    return (
      <>
        <div
          style={{ display: "flex", height: "80vh", justifyContent: "center" }}
        >
          <img
            src="/empty-item.webp"
            style={{ maxHeight: "600px", maxWidth: "500px", margin: "auto" }}
          ></img>
        </div>
      </>
    );
  }

  const lastPizzaIndex = 6 * currPage;
  const firstIndex = lastPizzaIndex - 6;
  const pagedDonations = Donations.slice(firstIndex, lastPizzaIndex);
  return (
    <div
      style={{ overflowY: "auto", maxHeight: "800px" }}
      className="container mt-4 text-start"
    >
      <Row xs={1} md={2} lg={3} className="g-4">
        {pagedDonations.map((donation) => (
          <Col key={donation._id} className="mb-2">
            <Card className="admin-donation-card">
              <Card.Body>
                <div className="mb-3">
                  <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                    <Card.Body
                      style={{
                        color: "#484848",
                        fontFamily: "'Tinos', serif",
                      }}
                    >
                      <h5>
                        <strong>Date & Sender</strong>
                      </h5>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(donation.createdAt).toLocaleString()}
                        <br />
                        <strong>Name: </strong> {donation.name}
                        <br />
                        <strong>Email: </strong> {donation.email}
                        <br />
                        <strong>Amount 👇🏼</strong>
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-3">
                  <Card
                    style={{
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      height: "200px",
                    }}
                  >
                    <Card.Body
                      style={{
                        color: "#484848",
                        fontFamily: "'Tinos', serif",
                      }}
                    >
                      <p>
                        <img
                          style={{
                            height: "160px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src="/stars.jpg"
                          alt=""
                        />
                        <strong className="amount-text">
                          {" "}
                          ₹{donation.donationAmount}
                        </strong>{" "}
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        totalPizzas={sortedDonations.length}
        pizzasPerPage={6}
        setCurrPage={setCurrPage}
        currPage={currPage}
      ></Pagination>
    </div>
  );
};
export default AdminDonations;
