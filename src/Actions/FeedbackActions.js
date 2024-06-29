import axios from "axios";

export const getAllFeedbackActions = ()=>async(dispatch)=>{
    dispatch({type:'GET_ALL_FEEDBACKS_REQUEST'})
    try {
        const response = await axios.get('https://yumyard-server-jq26.onrender.com/api/feedbacks/getallfeedbacks');
        dispatch({type:'GET_ALL_FEEDBACKS_SUCCESSFUL',payload:response.data})
    } catch (error) {
        dispatch({type:'GET_ALL_FEEDBACKS_FAILED',payload:error})
    }
}

export const submitFeedbackActions = (data)=> async(dispatch)=>{
    dispatch({type:'SUBMIT_FEEDBACK_REQUEST'});
    try {
        const response = await axios.post('https://yumyard-server-jq26.onrender.com/api/feedbacks/submitfeedback',{data})
        dispatch({type:'SUBMIT_FEEDBACK_SUCCESSFUL'});
    } catch (error) {
        dispatch({type:'SUBMIT_FEEDBACK_FAILED',payload:error})
    }
}