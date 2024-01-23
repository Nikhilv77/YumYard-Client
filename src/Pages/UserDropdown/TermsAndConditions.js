import React,{useState,useEffect} from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const TermsAndConditionsPage = () => {
  const [showTerms, setShowTerms] = useState(false);
  useEffect(()=>{
    setShowTerms(true)
  },[])
  const navigate = useNavigate();
  const cardStyle = {
    maxWidth: '600px', 
    margin: '0 auto',
    borderRadius:'10px',
    fontFamily: "'Tinos', serif",
   
  };

  const paragraphStyle = {
    textAlign: 'left',
    textIndent: '2em',
    fontSize:'1.2rem' 
  };

  return (
    <Container style={{minHeight:'80vh'}} className="mt-5 mb-5">
      <CSSTransition
      in = {showTerms}
      timeout={700}
      classNames='fade'
      unmountOnExit
      >
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title>
            <h2 className="text-center mb-4">Terms and Conditions</h2>
          </Card.Title>

          <div style={paragraphStyle} className="mb-4">
            <p>
              By using our services and placing orders through <strong>YumYard's</strong> website, you agree to abide by the following terms and conditions. Please read these terms carefully before proceeding with any orders.
            </p>
            <p>
              <strong>YumYard</strong> reserves the right to update or modify these terms at any time without prior notice. It is your responsibility to review these terms periodically for changes. Your continued use of our services following the posting of any changes constitutes acceptance of those changes.
            </p>
          </div>

          <div style={paragraphStyle} className="mb-4">
            <p>
              The services provided by <strong>YumYard</strong> are intended for personal, non-commercial use. You may not use our services for any illegal or unauthorized purpose. Any breach or violation of these terms may result in termination of your access to our services.
            </p>
            <p>
              If you have any questions or concerns about these terms and conditions, please contact us.
            </p>
          </div>

          <div className="text-center">
            <Button style={{fontSize:'1.2rem'}} variant="primary" onClick={()=>{navigate('/contactus')}}>
              Contact Us
            </Button>
          </div>
        </Card.Body>
      </Card>
      </CSSTransition>
    </Container>
  );
};

export default TermsAndConditionsPage;
