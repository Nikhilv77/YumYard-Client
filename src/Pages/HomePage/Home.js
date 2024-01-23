import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-scroll'
import { CSSTransition } from 'react-transition-group';
const HomePage = () => {
  const[showHome,setShowHome] = useState(false);
  useEffect(()=>{
    setShowHome(true)
  },[])
  const navigate = useNavigate();
 
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  return (
    <div>
      {/* Hero Section with Image Slider */}
      <section className='hero-section'>
       
          <div>
        <Slider {...sliderSettings}>
       
          <div>
            <img src="/homepage-logo.jpg" alt="Slider 1" className='slider-image' />
          </div>
          <div>
            <img src="/burgerBlog.jpg" alt="Slider 2" className='slider-image' />
          </div>
          <div>
            <img src="/newp.jpg" alt="Slider 3" className='slider-image' />
          </div>
      
        </Slider>
        <div style={{position:'relative', minHeight:'200px',overflow:'hidden'}} >
        <CSSTransition in = {showHome}
        timeout={1000}
        classNames='slideY'
        unmountOnExit
        >
        <div className='hero-section'>
      <div className='hero-content'>
        
        <h1 className='hero-text'>Welcome to YumYard</h1>
        <p className='hero-subtext'>Savor the Flavors, Delight in Every Bite</p>
   
        <button className='btn explore-button' onClick={()=>{
          navigate('/products')
        }}>Explore Now</button>
        
      </div>
    </div>
    </CSSTransition>
    </div>
    </div>
      </section>
      {/* Featured Products Section */}
      <section className='featured-section' id='featured-section'>
      <h2 className='heading-style'>Featured Meals</h2>
      <div className='featured-content'>
        {/* Card 1 */}
        <div className='card-style' onClick={()=>{
         navigate('/pizzas')
        }}>
          <img
            src="pizza-delight.jpg"
            alt="Featured Product 1"
            className='featured-image'
          />
          <h3 className='text-center'>Deluxe Pizzas</h3>
          <p>Indulge in our handcrafted, flavorful pizzas made with the finest ingredients. Perfect for pizza enthusiasts!</p>
          <button className='btn button-style'>Checkout</button>
        </div>

        {/* Card 2 */}
        <div className='card-style'onClick={()=>{
         navigate('/burgers')
        }}>
          <img
            src="burger-special.jpg"
            alt="Featured Product 2"
            className='featured-image'
          />
          <h3 className='text-center'> Juicy Burgers</h3>
          <p>Our Burgers are delicious combination of fresh Ingrediants and savory flavors. A must-try for burger lovers!</p>
          <button className='btn button-style'>Checkout</button>
        </div>

        {/* Card 3 */}
        <div className='card-style' onClick={()=>{
         navigate('/indian-meals')
        }}>
          <img
            src="indian-special.jpg"
            alt="Featured Product 3"
            className='featured-image'
          />
          <h3 className='text-center'>Indian Cuisine</h3>
          <p>Experience the classic flavors of India with our Special experitise in Indian cuisine. Simple, yet delightfully tasty and fresh!</p>
          <button className='btn button-style'>Checkout</button>
        </div>
        
      </div>
    </section>

      {/* About Us Section */}
      <section className='about-section'>
      <div className='about-content'>
        <h2 className='about-heading'>About YumYard</h2>
        <p className='about-paragraph'>
          "YumYard is more than a restaurant; it's a culinary journey, a celebration of taste and tradition. We pride ourselves in curating a menu that reflects the diverse flavors of global cuisines, from mouth-watering burgers to authentic Indian dishes and artisanal pizzas."
        </p>
        <p className='about-paragraph'>
          "Our commitment is not just to satisfy your hunger but to deliver an unforgettable dining experience. Every dish is crafted with precision, using the freshest ingredients and a dash of creativity, ensuring a symphony of flavors in every bite."
        </p>
        <img
          src="/restraunt.jpg"
          alt="About YumYard"
          className='about-image'
        />
      </div>
    </section>

      {/* fresh vegetables */}
      <section className='freshness-section'>
      <div className='freshness-content'>
        <h2 className='freshness-heading-style'>Fresh Ingredients, Fresh Flavors</h2>
        <p className='freshness-description-style'>
          We take pride in using only the freshest ingredients to create delicious and flavorful dishes.
          Our chefs are dedicated to cooking your meals fresh, ensuring a delightful dining experience.
        </p>
      
        <img
          src="/fresh-vegetables.jpeg" 
          alt="Fresh Ingredients"
          className='freshness-image-style'
        />
      </div>
    </section>

      {/* Customer Testimonials Section */}
      <section className='testimonials-section'>
      <div className='testimonials-content'>
        <h2 className='testimonials-content-h1'>Customer Testimonials</h2>
        <div className='testimonial-container'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='testimonial-card'>
              <img
              className='user-image-style'
                src={testimonial.userImage}
                alt={`User ${index + 1}`}
                
              />
              <p>{testimonial.comment}</p>
              <p>- {testimonial.userName}</p>
              <div className='stars-container'>
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <span key={i} role="img" aria-label="Star">⭐️</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

const testimonials = [
  {
    userName: 'John Doe',
    userImage: '/customer1.jpeg', 
    comment: 'Delicious food and excellent service! Will be back.',
    rating: 5,
  },
  {
    userName: 'Jane Smith',
    userImage: '/customer2.jpg', 
    comment: 'The burgers here are simply amazing. Great ambiance too!',
    rating: 5,
  },
  {
    userName: 'Michael Johnson',
    userImage: '/customer3.jpg',
    comment: 'Loved the variety of dishes. Amazing experience.',
    rating: 5,
  },
];

export default HomePage;
