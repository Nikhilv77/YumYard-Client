import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export const donationAction = (body) => async (dispatch) => {
  dispatch({type:'DONATION_REQUEST'});
  const stripe = await loadStripe(
 `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );
  try {
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/donation/donate',body);
    dispatch({type:'DONATION_SUCCESSFUL'});
    const sessionId = response.data.id;
    if(sessionId){
        await stripe.redirectToCheckout({
            sessionId : sessionId
        })
    }
  } catch (error) {
    dispatch({type:'DONATION_FAILED',payload:error})
  }
};


export const getAllDonations = ()=>async(dispatch)=>{
  dispatch({type:'GET_ALL_DONATIONS_REQUEST'});
  try{
  const response = await axios.get('https://yumyard-server-erfw.onrender.com/api/donation/getalldonations');
  dispatch({type:'GET_ALL_DONATIONS_SUCCESS',payload:response.data})
  }catch(error){
  dispatch({type:'GET_ALL_DONATIONS_FAILED',payload:error})
  }
}


export const saveThroughSessionDonation = (transactionId)=>async(dispatch)=>{
  dispatch({type:'SAVE_DONATION_REQUEST'});
  try {
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/session-donations/findByIdAndSaveDonation',{transactionId})
    dispatch({type:'SAVE_DONATION_SUCCESSFUL'})
  } catch (error) {
    dispatch({type:'SAVE_DONATION_FAILED'})
  }
}

export const downloadDonationReceiptAction = (transactionId) => async (dispatch) => {
  dispatch({ type: 'DOWNLOAD_DONATIONRECEIPT_REQUEST' });

  try {
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/session-donations/downloaddonationreceipt', { transactionId });
    dispatch({ type: 'DOWNLOAD_DONATIONRECEIPT_SUCCESSFUL', payload: response.data });
   
    return response.data.receipt.data; 
  } catch (error) {
    dispatch({ type: 'DOWNLOAD_DONATIONRECEIPT_FAILED' });
    throw error; 
  }
};