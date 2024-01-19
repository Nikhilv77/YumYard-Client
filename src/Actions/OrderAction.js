import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
export const orderAction = (body) => async (dispatch) => {
  const stripe = await loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );
  dispatch({ type: "ORDER_REQUEST" });
  console.log(body);

  try {
    const response = await axios.post("https://yumyard-server.cyclic.app/api/orders/placeorder",body);
    dispatch({ type: "ORDER_SUCCESSFULL" });
    const sessionId = response.data.id;
     console.log(sessionId,"hehe order action");
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
      const response = await axios.post('https://yumyard-server.cyclic.app/api/orders/getUserOrders',{currUserEmail:currUserEmail});
      // console.log(response.data,'coming from actions');
      dispatch({type:"GET_USER_ORDERS_SUCCESS",payload:response.data})
    }catch(error){
      dispatch({type:'GET_USER_ORDERS_FAILED',payload:error})
    }
}

export const getAllOrders = ()=>async(dispatch)=>{
  dispatch({type:'GET_ALL_ORDERS_REQUEST'});
  try{
  const response = await axios.get('https://yumyard-server.cyclic.app/api/orders/getallorders');
  dispatch({type:'GET_ALL_ORDERS_SUCCESS',payload:response.data})
  }catch(error){
  dispatch({type:'GET_ALL_ORDERS_FAILED',payload:error})
  }
}

export const CancelOrderAction = (orderId)=>async(dispatch)=>{
  dispatch({type:'DELETE_ORDER_REQUEST'});

  try{
   const response = await axios.post('https://yumyard-server.cyclic.app/api/orders/cancelorder',{orderId})
   dispatch({type:'DELETE_ORDER_SUCCESS'});
  }catch(error){
   dispatch({type:'DELETE_ORDER_FAILED',payload:error})
  }
}

export const saveThroughSession = (transactionId)=>async(dispatch)=>{
  dispatch({type:'SAVE_ORDER_REQUEST'});
  try {
    const response = await axios.post('https://yumyard-server.cyclic.app/api/session-orders/findByIdAndSave',{transactionId})
    dispatch({type:'SAVE_ORDER_SUCCESSFUL'})
  } catch (error) {
    dispatch({type:'SAVE_ORDER_FAILED'})
  }
}

export const downloadOrderReceiptAction = (transactionId) => async (dispatch) => {
  dispatch({ type: 'DOWNLOAD_RECEIPT_REQUEST' });

  try {
    const response = await axios.post('https://yumyard-server.cyclic.app/api/session-orders/downloadreceipt', { transactionId });
    dispatch({ type: 'DOWNLOAD_RECEIPT_SUCCESSFUL', payload: response.data });
    return response.data; // Return the data for use in the calling function
  } catch (error) {
    dispatch({ type: 'DOWNLOAD_RECEIPT_FAILED' });
    throw error; // Re-throw the error to propagate it to the calling function if needed
  }
};
