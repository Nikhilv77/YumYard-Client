import React from "react";
import { Link } from "react-router-dom";
import './ProductSidebar.css';



export default function ProductSidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/products">
            <img src='/indian-product.png' alt="Indian" className="navImage" />
            <p>Indian</p>
          </Link>
        </li>
        <li>
          <Link to="/products/pizzas">
            <img src="/pizza-product.png" alt="Pizzas" className="navImage" />
            <p>Pizzas</p>
          </Link>
        </li>
        <li>
          <Link to="/products/burgers">
            <img src="burger-product.png" alt="Burgers" className="navImage" />
            <p>Burgers</p>
          </Link>
        </li>
        <li>
          <Link to="/products/sides">
            <img src="sides-product.png" alt="Sides" className="navImage" />
            <p>Sides</p>
          </Link>
        </li>
        <li>
          <Link to="/products/bevarages">
            <img src="beverage-product.png" alt="Beverages" className="navImage" />
            <p>Beverages</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
