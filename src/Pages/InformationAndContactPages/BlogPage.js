import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import BlogContent from "../../Components/blogContent";

export const BlogPage = ({ blogs }) => {
  const { blogId } = useParams();
  const blog = blogs.find((item) => item.id === parseInt(blogId));
  const blogContent = blog.content;

 
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
      
      <Card
        style={{
          fontFamily: "'Tinos', serif",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Title
          style={{ fontSize: "2.3rem", textAlign: "center", margin: "20px 0" }}
        >
          {blog.title}
        </Card.Title>
        <Row>
          <Col md={12} className="text-center">
            <Card>
              <Card.Img
                src={blog.image}
                alt={blog.title}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Text style={{ fontSize: "1.4rem", marginBottom: "20px" }}>
                  {blog.content}
                </Card.Text>
                <Link to="/blog">
                  <Button style={{fontSize:'20px'}} variant="outline-primary">Back to Blogs</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
  );
};
