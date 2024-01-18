import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Actions/OrderAction";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";
import SuccessForUsers from "../../Components/SuccessForUsers";
import ErrorForUsers from "../../Components/ErrorForUsers";
import Pagination from "../../Components/PaginationForAdmin";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { deliveryAction } from "../../Actions/DeliveryAction";
import ClipLoader from "react-spinners/ClipLoader";
import './AdminOrders.css';
import { Alert } from "react-bootstrap";

export default function AdminOrders() {
  const [currPage, setCurrPage] = useState(1);
  const [showDialog, setShowDialog] = useState({});

  const dispatch = useDispatch();
  const { Orders, loading, error } = useSelector((state) => state.allOrders);
  const { success:deleteSuccess, deleteLoading, deleteError } = useSelector(
    (state) => state.deleteOrder
  );
  const { success, deliveryLoading, deliveryError } = useSelector(
    (state) => state.delivery
  );

  const[successForDeliver,setSuccessForDelivery] = useState(false)
  const [key, setKey] = useState(0);

  const handleAdminDashboardClick = () => {
    setKey((prevKey) => prevKey + 1);
  };
  useEffect(() => {
    dispatch(getAllOrders());
  }, [success,key]);

  const sortedOrders = useMemo(
    () =>
      Orders && Orders.length > 0
        ? Orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [],
    [Orders]
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

  if (!loading && !error && Orders.length < 1) {
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

  const lastPizzaIndex = 2 * currPage;
  const firstIndex = lastPizzaIndex - 2;
  const pagedOrders = sortedOrders.slice(firstIndex, lastPizzaIndex);

  return (
    <div style={{overflowY:'auto',maxHeight:'800px'}} className="container mt-4 text-start">
   
      {successForDeliver && (
        <Alert style={{fontSize:'1.2rem'}} className="mt-2 text-center" variant="success">Order updated successfully.</Alert>
      )}
      {deliveryError && (
       <Alert  style={{fontSize:'1.2rem'}} className="mt-2 text-center" variant="danger">Could not deliver, something went wrong!</Alert>
      )}
      <Row className="justify-content-center">
        <Col md={12}>
          {pagedOrders.map((order) => (
            <Card
              key={order._id}
              className="  mb-3 admin-order-card"
            >
              <Card.Body>
                <Row className="mb-3">
                  <Col md={4}>
                    <Card
                     className="mt-2 w-100"
                      style={{
                    
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Body style={{color:'#484848',  fontFamily: "'Tinos', serif"}}>
                        <h5>
                          <strong>Order Information</strong>
                        </h5>
                        <p>
                          <strong>Order ID:</strong> {order._id}
                          <br />
                          <strong>Order Amount: </strong>&#8377;{order.orderAmount}
                          <br />
                          <strong>Date:</strong>{" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
  
                  <Col md={8}>
                    <Card
                     className="mt-2 w-100"
                      style={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Card.Body style={{color:'#484848',  fontFamily: "'Tinos', serif"}}>
                        <h5>
                          <strong>Customer Details</strong>
                        </h5>
                        <p>
                          <strong>Name: </strong>{order.name}
                          <br /><strong>Contact: </strong>{order.email},{order.number}
                          <br />
                          <strong>Shipping Address: </strong>
                          {`${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}.`}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
  
                <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                  <Card.Body style={{color:'#484848',  fontFamily: "'Tinos', serif"}}>
                    <p>
                      <strong>Ordered Items:</strong>{" "}
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
  
                {order.isDelivered && !order.isCancelled ? (
                  <div className="order-actions mt-3">
                    <Button
                    
                    onClick={() =>{ dispatch(deliveryAction(order._id))
                    setSuccessForDelivery(true);
                    setTimeout(()=>{setSuccessForDelivery(false)},3000)
                    }}
                       className="custom-button-undeliver"
                    >
                      Undeliver
                    </Button>
                  </div>
                ) : order.isCancelled ? (
                  <div className="order-actions mt-3">
                    <Button
                      disabled
                      className="custom-button-cancelled"
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
                  className="custom-button-deliver mt-3 "
                  onClick={() =>{ dispatch(deliveryAction(order._id))
                    setSuccessForDelivery(true);
                    setTimeout(()=>{setSuccessForDelivery(false)},3000)
                    }}
                >
                 {deliveryLoading?<><Spinner animation="border" size="sm"/>...</>:'Deliver'}
                </Button>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
      <Pagination
        totalPizzas={sortedOrders.length}
        pizzasPerPage={2}
        setCurrPage={setCurrPage}
        currPage={currPage}
      ></Pagination>
    </div>
  );
  
}



