export const forgotPasswordReducer = (state={loading:false,otp : null,error:null},action)=>{
switch(action.type){
case 'FORGOT_PASSWORD_REQUEST':return{
    ...state,
    loading:true,
    error:null,
}
case 'FORGOT_PASSWORD_SUCCESSFUL':return{
    ...state,
    loading:false,
    otp:action.payload,
    error:null,
}
case 'FORGOT_PASSWORD_FAILED':return{
    ...state,
    loading:false,
    error:action.payload
}
default:return state
}
}