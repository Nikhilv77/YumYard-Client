import { Card, Row, Col } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../../Components/PaginationForAdmin";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import ReactStars from "react-rating-stars-component";
import { getAllFeedbackActions } from "../../Actions/FeedbackActions";
import './AdminFeedbacks.css'
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
const AdminFeedbacks = () => {
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const{success} = useSelector(state=>state.submitFeedback)
  useEffect(() => {
    dispatch(getAllFeedbackActions());
  }, [success]);

  const { Feedbacks, loading, error } = useSelector((state) => state.Feedbacks);
  const sortedFeedbacks = useMemo(
    () =>
      Feedbacks && Feedbacks.length > 0
        ? Feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
    [Feedbacks]
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
      <div >
        <div style={{ display: "flex", height: "85vh", justifyContent: "center" }}>
          <Alert className="m-auto"  style={{maxWidth:'300px'}} variant="danger">Something went wrong!</Alert>
        </div>
      </div>
    );
  }

  if (!loading && !error && Feedbacks.length < 1) {
    return (
      <>
      <div
      style={{display : 'flex',height:'80vh', justifyContent:'center'}}
      >

<img src="/empty-item.webp" style={{maxHeight:'600px',maxWidth:'500px', margin:'auto'}}></img>
      </div>
      </>
    );
  }


  const lastFeedbackIndex = 6 * currPage;
  const firstIndex = lastFeedbackIndex - 6;
  const pagedFeedbacks = sortedFeedbacks.slice(firstIndex, lastFeedbackIndex);

  return (
    <div style={{overflowY :'auto',maxHeight:'800px'}} className="container mt-4 text-start">
      <Row xs={1} md={2} lg={3} className="g-4">
        {pagedFeedbacks.map((feedback) => (
          <Col key={feedback._id} className="mb-2">
            <Card className="admin-feedback-card">
              <Card.Body>
                <div className="mb-3">
                  <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                    <Card.Body style={{ color: "#484848",  fontFamily: "'Tinos', serif" }}>
                      <h5>
                        <strong>Date & Sender</strong>
                      </h5>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(feedback.createdAt).toLocaleString()}
                        <br />
                        <strong>Name:</strong> {feedback.name}
                        <br />
                        <strong>Status:</strong>
                        <strong>
                          {feedback.isCustomer ? (
                            <>
                              <img
                                style={{ height: "30px", width: "30px" }}
                                src="/customer-icon.jpg"
                                alt="customer icon"
                                className="object-cover rounded"
                              />
                              <span>Customer</span>
                            </>
                          ) : (
                            <>
                              <img
                                style={{ height: "30px", width: "30px" }}
                                src="/no-customer-icon.png"
                                alt="customer icon"
                                className="object-cover rounded"
                              />
                              <span>Not a Customer</span>
                            </>
                          )}
                        </strong>
                        <br />
                        <strong>Email</strong> {feedback.email}
                        <br />
                        <ReactStars
                          count={5}
                          value={feedback.rating}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </p>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-3">
                  <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", height:'230px' }}>
                    <Card.Body style={{ color: "#484848",  fontFamily: "'Tinos', serif"}}>
                      <p>
                        <strong>Comment:</strong>{" "}
                        {feedback.comment}
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
        totalPizzas={sortedFeedbacks.length}
        pizzasPerPage={6}
        setCurrPage={setCurrPage}
        currPage={currPage}
      ></Pagination>
    </div>
  );
};

export default AdminFeedbacks;
