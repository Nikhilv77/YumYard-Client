import axios from "axios";

export const forgotPasswordAction = (otpAndEmail)=>async(dispatch)=>{
dispatch({type:'FORGOT_PASSWORD_REQUEST'});
try{
    const response = await axios.post('https://yumyard-server-erfw.onrender.com/api/users/forgotpassword',otpAndEmail);
    dispatch({type:'FORGOT_PASSWORD_SUCCESSFUL',payload:response.data})
}catch(error){
    dispatch({type:'FORGOT_PASSWORD_FAILED',payload:error});
}
}