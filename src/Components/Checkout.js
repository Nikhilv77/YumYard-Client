// import StripeCheckout from "react-stripe-checkout";
import { boxShadowStyleForButton } from "../Pages/CartPage";
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { orderAction } from "../Actions/OrderAction";

export default function Checkout({ totalPrice,address }) {
 const dispatch =  useDispatch()
 const currUser = useSelector(state=>state.login.currUser);
 const cartItems = useSelector(state=>state.cart.cartItems);
  const tokenHandler = async () => {
    console.log(address);
    const body = {
      cartItems,
      currUser,
      totalPrice,
    }
   dispatch(orderAction(body))
  };
  
  return (
    <div>
        <button onClick={tokenHandler} style={boxShadowStyleForButton}>
          Checkout
        </button>
    </div>
  );
}
