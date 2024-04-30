import React, { useState,useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedbackActions } from "../../Actions/FeedbackActions";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";
const FeedbackForm = () => {
  const [showFeedback,setShowFeedback] = useState(false)
  const{loading,success,error} = useSelector(state=>state.submitFeedback)
  useEffect(()=>{
    setShowFeedback(true)
  },[])
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setFeedback((prevFeedback) => ({ ...prevFeedback, rating: newRating }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      let value ={
      name:feedback.name,
      email:feedback.email,
      rating:feedback.rating,
      comment:feedback.comment,
    }
    let data;
    try {
      const response = await axios.post('https://yumyard-server.onrender.com/api/users/doesfeedbackexist',{value});
      data = {...value,isCustomer:true}
     
      dispatch(submitFeedbackActions(data))
    } catch (error) {
      data = {...value,isCustomer:false}
      dispatch(submitFeedbackActions(data))
    }
    
  };

  return (
    <Container style={{minHeight : '80vh'}} className="mt-5 d-flex justify-content-center align-items-center mb-5">
      <CSSTransition
      in = {showFeedback}
      timeout={700}
      classNames='fade'
      unmountOnExit
      >
      <Card style={{ width : '90%', fontFamily: "'Tinos', serif",fontSize:'1.3rem', borderRadius:'10px', padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)", maxWidth: "650px", margin: "auto" }}>
        <Card.Title>
          <h4 style={{ marginBottom: "20px", color: "#333",fontSize:'1.8rem' }}>Your Feedback matters to us!</h4>
        </Card.Title>
        <Card.Body>
          <Form style={{ maxHeight: '490px' }} onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={{fontSize:'1.2rem'}}
                type="text"
                placeholder="Enter your name"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                   style={{fontSize:'1.2rem'}}
                type="email"
                placeholder="Enter your email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <div style={{ marginTop: "10px",display:'flex', justifyContent:'center' }}>
                  <ReactStars
                  name = 'rating'
                  count={5}
                  onChange={handleRatingChange}
                  size={48}
                  isHalf={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formComment">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                   style={{fontSize:'1.2rem'}}
                as="textarea"
                rows={4}
                placeholder="Enter your comments"
                name="comment"
                value={feedback.comment}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button style={{ marginTop: '10px',fontSize:'1.2rem' }} variant="primary" type="submit">
              Submit Feedback
            </Button>
        
          </Form>
 
        </Card.Body>
        {loading && <ClipLoader className=" m-auto mt-3" size={30}></ClipLoader>}
            {success && <Alert className = 'mt-3'>Thank you for your feedback.</Alert>}
            {error && <Alert variant= 'danger' className = 'mt-3'>Something went wrong.</Alert>}
      </Card>
      </CSSTransition>
    </Container>
  );
};

export default FeedbackForm;
