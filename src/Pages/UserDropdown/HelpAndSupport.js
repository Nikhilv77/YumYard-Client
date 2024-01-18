import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const HelpAndSupport = () => {
  const [showHelp, setShowHelp] = useState(false);
  useEffect(()=>{
    setShowHelp(true)
  },[])
  const navigate = useNavigate();

  return (
      <div style={{padding:'15px', minHeight:'90vh'}}>
        <CSSTransition
        in = {showHelp}
        timeout={1000}
        classNames='slideY'
        unmountOnExit
        >
      <Card className='mt-5 mb-5' style={{ margin: 'auto',  fontFamily: "'Tinos', serif", maxWidth:'800px', borderRadius : '10px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h2>Help and Support</h2> <hr />
          </Card.Title>
          <p style={{fontSize:'1.3rem',fontWeight:'bold'}} className="mb-4">
            Need assistance or have questions? Explore our support resources or contact us for help.
          </p>

          {/* Contact Us */}
          <Card style={{width:'90%', margin:'auto', display:'flex', boxShadow : '0px 0px 3px black', padding : '10px'}} className="mb-3">
            <Row>
              <Col  md={8} style={{display:'flex'}}>
                <span style={{fontSize:'1.2rem', textAlign:'left'}}>Reach out to us if you need assistance or have questions</span>
              </Col>
              <Col md={4} style={{textAlign:'right'}}>
                <Button
                style={{fontSize:'1.2rem'}}
                  variant="info"
                  size="sm"
                  onClick={() => {
                    navigate('/contactus');
                  }}
                  block
                >
                  Contact
                </Button>
              </Col>
            </Row>
          </Card>

          {/* FAQs */}
          <Card style={{width:'90%', margin:'auto', display:'flex', boxShadow : '0px 0px 3px black', padding : '10px'}}  className="mb-3">
            <Row>
              <Col md={8} style={{display:'flex'}}>
                <span style={{fontSize:'1.2rem'}}>Explore frequently asked questions about our services</span>
              </Col>
              <Col md={4} style={{textAlign:'right'}}>
                <Button
                style={{fontSize:'1.2rem'}}
                  variant="success"
                  size="sm"
                  onClick={() => {
                    navigate('/faqs');
                  }}
                  block
                >
                  FAQs
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Terms and Conditions */}
          <Card style={{width:'90%', margin:'auto', display:'flex', boxShadow : '0px 0px 3px black', padding : '10px'}} className="mb-3">
            <Row>
              <Col md={8} style={{display:'flex'}}>
                <span style={{fontSize:'1.2rem'}}>Read our terms and conditions for using our platform</span>
              </Col>
              <Col md={4} style={{textAlign:'right'}}>
                <Button
                style={{fontSize:'1.2rem'}}
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    navigate('/terms-and-conditions');
                  }}
                  block
                >
                  Terms
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Feedback Us */}
          <Card style={{width:'90%', margin:'auto', display:'flex', boxShadow : '0px 0px 3px black', padding : '10px'}} className="mb-3">
            <Row>
              <Col md={8} style={{display:'flex'}}>
                <span style={{fontSize:'1.2rem'}}>Provide feedback to help us improve our services</span>
              </Col>
              <Col md={4} style={{textAlign:'right'}}>
                <Button
                style={{fontSize:'1.2rem'}}
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate('/feedback');
                  }}
                  block
                >
                  Feedback
                </Button>
              </Col>
            </Row>
          </Card>

          <p style={{fontSize:'1.2rem'}} className="mt-3">
            If you need further assistance, please feel free to reach out to us at{' '}
            <a href="mailto:supportme@yumyard.com">supportme@yumyard.com</a>.
          </p>
        </Card.Body>
      </Card>
      </CSSTransition>
      </div>
  );
};

export default HelpAndSupport;
