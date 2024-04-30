import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { submitContactActions } from "../../Actions/ContactActions";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
const ContactUs = () => {
  const[showContact,setShowContact] = useState(false) 
  const{loading,success,error} = useSelector(state=>state.submitContact)
  useEffect(()=>{
   setShowContact(true)
  },[])
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef  = useRef();
  const categoryRef = useRef();
  const messageRef = useRef();
  const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    e.preventDefault();
    let value = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      number: numberRef.current.value,
      category:categoryRef.current.value,
      message:messageRef.current.value
    }
    let data;
    try {
      const response = await axios.post('https://yumyard-server.onrender.com/api/users/doescontactexist',{value});
      data = {...value,isCustomer:true}
      dispatch(submitContactActions(data))
    } catch (error) {
      data = {...value,isCustomer:false}
      dispatch(submitContactActions(data))
    }
  };

  return (
    <Container  style={{  fontFamily: "'Tinos', serif",fontSize:'1.3rem' }}>
      <Row >
        <Col md={{ span: 6, offset: 3 }}>
        <div style={{minHeight:'100vh'}}>
        <CSSTransition in = {showContact}
      timeout={700}
      classNames='fade'
      unmountOnExit
      >
          <Card className="mb-5 mt-5" style={{ padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)" }}>
            <Card.Title style={{fontSize:'25px'}}><h2>Contact Us</h2></Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control style={{fontSize:'1.2rem'}} ref={nameRef} type="text" placeholder="Enter your name" required />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control style={{fontSize:'1.2rem'}} ref={emailRef} type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control style={{fontSize:'1.2rem'}} ref={numberRef} type="tel" placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group controlId="formCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control style={{fontSize:'1.2rem'}} ref={categoryRef} as="select" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>General Inquiry</option>
                    <option>Customer Support</option>
                    <option>Partnership</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control style={{fontSize:'1.2rem'}} ref={messageRef} as="textarea" rows={4} placeholder="Enter your message" required />
              </Form.Group>

                <Button style={{marginTop:'10px', fontSize:'1.2rem'}} variant="primary" type="submit">
                Submit
                </Button>
                <br />
                {loading && <ClipLoader className="mt-2" size={30}></ClipLoader>}
                { success && <Alert className="mt-3" variant="success">Thank you for reaching out. You will be contacted soon.</Alert>}
           {error && <Alert className="mt-3" variant="danger">Sorry, something went wrong.</Alert> }
              </Form>
            </Card.Body>
            <Card.Footer>
              <Card.Title>Message</Card.Title>
              <Card.Text>
                If you prefer to reach out through email, please send your message to{" "}
                <a style = {{color:'black'}}href="mailto:info@yumyard.com">info@yumyard.com</a>.
              </Card.Text>
            </Card.Footer>
          </Card>
        </CSSTransition>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
