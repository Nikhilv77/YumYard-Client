// WishlistPage.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import WishlistItem from "./WishListItem";
import { deleteFromWishlistAction } from "../../Actions/WishlistActions";


const WishlistPage = () => {

  const { currUser } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToAddress = () => {
    if (currUser) {
      navigate("/address");
    } else {
      navigate("/login");
    }
  };

  const wishlistState = useSelector((state) => state.wishlist);
  const wishlistItems = wishlistState.wishlistItems;

  if(wishlistItems.length <= 0){
    return(
      <div
      style={{display : 'flex',height:'80vh', justifyContent:'center'}}
      >

<img src="/empty-item.webp" style={{maxHeight:'400px',maxWidth:'400px', margin:'auto'}}></img>
      </div>
    )
  }

  return (
    <div className="" style={{ fontFamily: "'Tinos', serif"}}>
      
      
            <Card
              style={{
                borderRadius: "15px",
                backgroundColor: "#F5F5F5",
                padding: "20px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                border: "1px solid #ddd",
              }}
            >
              <Card.Title
                style={{
                  fontSize: "2.4rem",
                  margin: "20px 0",
                  textAlign: "center",
                  color: "#333",
                }}
              >
                Favorites❤
              </Card.Title>
              {wishlistItems.map((item) => (
                <WishlistItem key={item.id} item={item} />
              ))}
            </Card>
    </div>
  );
};

export default WishlistPage;
