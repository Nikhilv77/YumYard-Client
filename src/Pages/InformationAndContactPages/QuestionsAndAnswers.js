import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion'
import { Container } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

export default function QuestionsAndAnswers() {
    const faqs = [
        {
          question: "What is YumYard?",
          answer: "YumYard is an online platform where you can discover and order delicious meals..",
        },
        {
          question: "How do I place an order?",
          answer: "To place an order, simply browse the available meals, add them to your cart, and proceed to checkout. Follow the steps to complete your order.",
        },
        {
          question: "Are the meals made fresh?",
          answer: "Yes, all meals are prepared fresh when you place an order to ensure quality and taste.",
        },
        {
          question: "Which ingredients are used in the meals?",
          answer: "We use high-quality, fresh ingredients in our meals. Specific ingredient information is available for each dish on the product page.",
        },
        {
          question: "Can I cancel my order?",
          answer: "Yes, you can cancel your order within the first 3 minutes of placing it. After that time frame, orders are processed and cannot be canceled. If you need further assistance, please contact our customer support.",
        },
        {
          question: "Are there any shipping charges?",
          answer: "Yes, we charge a flat rate of ₹20 for shipping. This helps us ensure the safe and timely delivery of your delicious meals to your doorstep.",
        },
        {
         question:"Are discounts available for bulk orders?",
         answer :" Yes, we offer discounts for bulk orders. Contact us for more information and personalized pricing."
        },{
            question:" How can I contact customer support?",
            answer :'You can contact our customer support through the "Contact Us" page on our website. We are also available via email and phone during business hours.'
        },
        {
          question: "Where does the money from donations go?",
          answer:
            "The funds from your donations go directly towards providing meals, shelter, and education for homeless and underprivileged children. We are committed to ensuring that every penny is used to make a positive impact in their lives.",
        },
        // Add more FAQs as needed
      ];
    
      return (
        <div className="justify-content-center align-items-center" style={{minHeight:"100%"}}>
        
        <Card style={{  fontFamily: "'Tinos', serif" }}>
            <Card.Body>
                <Card.Title className="text-center mb-4"><h2>Frequently Asked Questions</h2></Card.Title>
                <Accordion  defaultActiveKey="0" className="text-start custom-accordion">
                    {faqs.map((faq, index) => (
                        <Card key={index}>
                            <Accordion.Item  eventKey={index.toString()}>
                                <Accordion.Header>
                                    <span style={{fontSize:'1.2rem'}}>{faq.question}</span>
                                </Accordion.Header>
                                <Accordion.Body style={{ fontSize: '1.2rem' }}>
                                    {faq.answer}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Card>
                    ))}
                </Accordion>
            </Card.Body>
        </Card>
    
        </div>
    );
    }
    

    

