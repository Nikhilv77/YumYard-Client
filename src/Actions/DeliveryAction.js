import axios from "axios";

export const deliveryAction = (orderId)=>async(dispatch)=>{
    dispatch({type:'DELIVERY_REQUEST'});
    try{
     const reponse = await axios.post('/api/orders/deliver',{orderId});
     dispatch({type:'DELIVERY_SUCCESS'})   
    }catch(error){
    dispatch({type:'DELIVERY_FAILED',payload:error})
    }
}