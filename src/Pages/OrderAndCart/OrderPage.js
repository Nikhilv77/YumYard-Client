import React, { useState, useEffect, useMemo } from "react";
import { downloadOrderReceiptAction, getUserOrders } from "../../Actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import ConfirmationDialog from "../../Components/ConfirmDialogBox";
import { CancelOrderAction } from "../../Actions/OrderAction";
import SuccessForUsers from "../../Components/SuccessForUsers";
import ErrorForUsers from "../../Components/ErrorForUsers";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Components/PaginationForAdmin";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
import "./OrderPage.css";

const OrderPage = () => {
  const[receiptLoading,setReceiptLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState({});
  const { currUser } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const { success, deleteLoading, deleteError } = useSelector(
    (state) => state.deleteOrder
  );
  useEffect(() => {
    if (!currUser) {
      navigate("/404");
    } else {
      dispatch(getUserOrders());
    }
  }, [dispatch, success]); // Include success in the dependency array

  const { orders, loading, error } = useSelector((state) => state.orders);

  const sortedOrders = useMemo(
    () =>
      orders && orders.length > 0
        ? orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
    [orders]
  );

  const handleCancelOrder = (orderId) => {
    setShowDialog((prev) => ({
      ...prev,
      [orderId]: false,
    }));
    dispatch(CancelOrderAction(orderId));
  };
  const handleDownloadReceipt = async (order) => {
    try {
      setReceiptLoading(true);
  
      const receiptData = await dispatch(downloadOrderReceiptAction(order.transactionId));
      const pdfUint8Array = new Uint8Array(receiptData.receipt.data);
      const blob = new Blob([pdfUint8Array], { type: "application/pdf" });
      const link = document.createElement("a");
  
      link.href = URL.createObjectURL(blob);
      link.download = `OrderReceipt_${order.transactionId}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error handling receipt download:", error);
      setReceiptLoading(false);
    } finally {
      setReceiptLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="card-container">
        <div
          style={{ display: "flex", height: "88vh", justifyContent: "center" }}
          className="card"
        >
          <ClipLoader className="m-auto" size={60}></ClipLoader>
        </div>
      </div>
    );
  
  }
  if (error) {
    return (
      <div className="card-container">
        <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
          className="card"
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

  if (orders.length <= 0) {
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
  } else if (sortedOrders.length > 0) {
    const lastIndex = currPage * 4;
    const firstIndex = lastIndex - 4;
    const pagedOrders = sortedOrders.slice(firstIndex, lastIndex);

    return (
      <div className="text-start" style={{  fontFamily: "'Tinos', serif" }}>
        <Card
          className="justify-content-center"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
        >
          <Card.Body>
            <Card.Title
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                marginBottom: "20px",
              }}
            >
              {" "}
              My Orders
            </Card.Title>
            {success && (
              <Alert
                style={{
                  fontSize: "1.2rem",
                  maxWidth: "885px",
                  margin: "auto",
                  textAlign: "center",
                }}
                className="mb-4"
                variant="success"
              >
                Order Cancelled, refund has been initiated.
              </Alert>
            )}
            <Row className="justify-content-center">
              <Col md={8}>
                {pagedOrders.map((order) => (
                  <Card
                    key={order._id}
                    className="mb-4 order-card"
                    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
                  >
                    <Card.Body>
                      {/* Order Information */}
                      <Row className="mb-3">
                        <Col md={6}>
                          <Card
                            className="m-1"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              borderRadius: "10px",
                            }}
                          >
                            <Card.Body>
                              <h5>
                                <strong style={{ fontSize: "1.4rem" }}>
                                  Order Information
                                </strong>
                                <hr />
                              </h5>
                              <p>
                                <span>
                                  <strong style={{ marginRight: "5px" }}>
                                    Order Status:
                                  </strong>
                                </span>
                                <span
                                  style={{ fontSize: "1rem" }}
                                  className={`status-icon ${
                                    order.isDelivered
                                      ? "delivered"
                                      : order.isCancelled
                                      ? "cancelled"
                                      : "processing"
                                  }`}
                                >
                                  {order.isDelivered
                                    ? "Delivered"
                                    : order.isCancelled
                                    ? "Cancelled"
                                    : "Processing"}
                                </span>
                                <br />
                                <strong>Order ID:</strong> {order._id}
                                <br />
                                <strong>Order Amount:</strong>{" "}
                                {order.orderAmount}
                                <br />
                                <strong>Date:</strong>{" "}
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>

                        {/* Delivering To */}
                        <Col md={6}>
                          <Card
                            className="m-1"
                            style={{
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              borderRadius: "10px",
                            }}
                          >
                            <Card.Body>
                              <h5>
                                <strong style={{ fontSize: "1.4rem" }}>
                                  Details
                                </strong>
                                <hr />
                              </h5>
                              <p>
                                {order.name}, <br />
                                {order.email},{order.number}
                                <br />
                                <strong>Shipping Address: </strong>
                                {`${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}.`}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      {/* Order Items */}
                      <Card
                        style={{
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          borderRadius: "10px",
                        }}
                      >
                        <Card.Body>
                          <p>
                            <strong style={{ fontSize: "1.4rem" }}>
                              Ordered Items
                            </strong>{" "}
                            <br />
                            <hr />
                            {order.orderItems.map((item) => (
                              <span key={item._id}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{ height: "30px", width: "30px" }}
                                />{" "}
                                {item.name}{" "}
                                {item.variant ? `(${item.variant})` : ""}(
                                {item.quantity}) - ₹{item.price * item.quantity}
                                ,
                              </span>
                            ))}
                          </p>
                        </Card.Body>
                      </Card>
                      {/* Action Buttons */}
                      {!order.isDelivered && !order.isCancelled ? (
                        <div className="order-actions mt-3">
                          <Button
                            style={{ marginBottom: "8px", fontSize: "1.1rem" }}
                            onClick={() => {
                              setShowDialog((prev) => ({
                                ...prev,
                                [order._id]: true,
                              }));
                            }}
                            variant="danger"
                            className="ms-2"
                          >
                            Cancel Order
                          </Button>
                          <Button
                            style={{ marginBottom: "8px", fontSize: "1.1rem" }}
                            onClick={() => handleDownloadReceipt(order)}
                            variant="success"
                            className="ms-2"
                          >   
                           {receiptLoading? <>downloading...<Spinner size="sm" animation="border"/> </>:'Download Receipt'}
                          </Button>
                          {deleteError && (
                            <Alert
                              style={{
                                fontSize: "1.2rem",
                                maxWidth: "900px",
                                margin: "auto",
                                textAlign: "center",
                              }}
                              variant="danger"
                            >
                              Order did not cancel, something went wrong
                            </Alert>
                          )}
                          {deleteLoading && (
                            <ClipLoader
                              style={{ margin: "auto" }}
                              size={50}
                            ></ClipLoader>
                          )}

                          {showDialog[order._id] && (
                            <ConfirmationDialog
                              message="Are you sure ?"
                              orderDate={order.createdAt}
                              onYes={() => handleCancelOrder(order._id)}
                              onNo={() => {
                                setShowDialog((prev) => ({
                                  ...prev,
                                  [order._id]: false,
                                }));
                              }}
                            ></ConfirmationDialog>
                          )}
                        </div>
                      ) : order.isCancelled ? (
                        <div className="order-actions mt-3">
                          <Button
                            disabled
                            style={{ marginBottom: "8px", fontSize: "1.1rem" }}
                            onClick={() => {
                              setShowDialog((prev) => ({
                                ...prev,
                                [order._id]: true,
                              }));
                            }}
                            variant="danger"
                          >
                            Cancelled
                          </Button>
                        </div>
                      ) : (
                        <Button
                            style={{fontSize: "1.1rem" }}
                            onClick={() => handleDownloadReceipt(order)}
                            variant="success"
                            className="mt-3"
                          >
                           {receiptLoading ? <>downloading...<Spinner size="sm" animation="border"/> </>:'Download Receipt'}
                          </Button>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Card.Body>
          <Pagination
            totalPizzas={sortedOrders.length}
            pizzasPerPage={4}
            setCurrPage={setCurrPage}
            currPage={currPage}
          ></Pagination>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="card-container">
        <div
          style={{ display: "flex", height: "85vh", justifyContent: "center" }}
          className="card"
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
};

export default OrderPage;
