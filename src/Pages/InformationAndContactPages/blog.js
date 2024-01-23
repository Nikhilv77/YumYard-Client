import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const StylishBlogPage = () => {
  const [showBlog, setShowBlog] = useState(false);
  useEffect(() => {
    setShowBlog(true);
  }, []);
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Pizza Making",
      content:
        "Explore the mouth-watering world of pizzas at YumYard. From classic Margherita to exotic toppings, we have it all! Indulge in a symphony of flavors crafted with passion and precision.",
      image: "/pizzaBlog.jpg", 
    },
    {
      id: 2,
      title: "Burger Bliss: Crafting the Ultimate Burger Experience",
      content:
        "Dive into the world of juicy burgers. Our burgers are made with the finest ingrediants to satisfy your cravings. Experience taste and health at the same time.",
      image: "/burgerB.jpg", 
    },
    {
      id: 3,
      title: "A Culinary Odyssey: Exploring Indian Cuisines",
      content:
        "Experience the rich and diverse flavors of Indian cuisines. From spicy curries to flavorful biryanis, we have something for everyone.",
      image: "/indianCuisine.jpg", 
    },
  ];

  return (
    <div style={{minHeight:'90vh'}}>
    <CSSTransition in={showBlog} timeout={700} classNames="fade" unmountOnExit>
      <Card
        style={{
          padding: "20px",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)",
            fontFamily: "'Tinos', serif",
          fontSize: "1.2rem",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            textAlign: "center",
            color: "#333",
            fontSize: "2.3rem",
          }}
        >
          Checkout our Blogs!
        </h2>
        <Row>
          {blogPosts.map((post) => (
            <Col key={post.id} md={4}>
              <Card className="blog-card">
                <Card.Img variant="top" src={post.image} alt={post.title} />
                <Card.Body>
                  <Card.Title
                    style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  >
                    {post.title}
                  </Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="primary">Read More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </CSSTransition>
    </div>
  );
};

export default StylishBlogPage;
