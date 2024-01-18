// NotFoundPage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundAuthPage = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5 ">
        <Col md={6} className="text-center">
          <Card className="p-4 shadow rounded mt-5">
            <img src='/auth-not-found.png' alt="404 Not Found" className="img-fluid mb-4" />
         
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundAuthPage;