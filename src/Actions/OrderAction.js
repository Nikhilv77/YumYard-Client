import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
export const orderAction = (body) => async (dispatch) => {
  const stripe = await loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );
  dispatch({ type: "ORDER_REQUEST" });


  try {
    const response = await axios.post("https://yumyard-server-erfw.onrender.com/api/orders/placeorder",body);
    dispatch({ type: "ORDER_SUCCESSFULL" });
    const sessionId = response.data.id;
 
    if (sessionId) {
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
    }
  } catch (error) {
    dispatch({ type: "ORDER_FAILED", payload: error });
    console.log(error);
  }
};

export const getUserOrders = ()=>async(dispatch,getState)=>{
    const currUserEmail= getState().login.currUser.email;
    dispatch({type:'GET_USER_ORDERS_REQUEST'})
    try{
      const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/orders/getUserOrders',{currUserEmail:currUserEmail});
     
      dispatch({type:"GET_USER_ORDERS_SUCCESS",payload:response.data})
    }catch(error){
      dispatch({type:'GET_USER_ORDERS_FAILED',payload:error})
    }
}

export const getAllOrders = ()=>async(dispatch)=>{
  dispatch({type:'GET_ALL_ORDERS_REQUEST'});
  try{
  const response = await axios.get('https://yumyard-server-erfw.onrender.com/api/orders/getallorders');
  dispatch({type:'GET_ALL_ORDERS_SUCCESS',payload:response.data})
  }catch(error){
  dispatch({type:'GET_ALL_ORDERS_FAILED',payload:error})
  }
}

export const CancelOrderAction = (orderId)=>async(dispatch)=>{
  dispatch({type:'DELETE_ORDER_REQUEST'});

  try{
   const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/orders/cancelorder',{orderId})
   dispatch({type:'DELETE_ORDER_SUCCESS'});
  }catch(error){
   dispatch({type:'DELETE_ORDER_FAILED',payload:error})
  }
}

export const saveThroughSession = (transactionId)=>async(dispatch)=>{
  dispatch({type:'SAVE_ORDER_REQUEST'});
  try {
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/session-orders/findByIdAndSave',{transactionId})
    dispatch({type:'SAVE_ORDER_SUCCESSFUL'})
  } catch (error) {
    dispatch({type:'SAVE_ORDER_FAILED'})
  }
}

export const downloadOrderReceiptAction = (transactionId) => async (dispatch) => {
  dispatch({ type: 'DOWNLOAD_RECEIPT_REQUEST' });

  try {
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/session-orders/downloadreceipt', { transactionId });
    dispatch({ type: 'DOWNLOAD_RECEIPT_SUCCESSFUL', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'DOWNLOAD_RECEIPT_FAILED' });
    throw error; 
  }
};
