import axios from "axios";

export const getAllFeedbackActions = ()=>async(dispatch)=>{
    dispatch({type:'GET_ALL_FEEDBACKS_REQUEST'})
    try {
        const response = await axios.get('/api/feedbacks/getallfeedbacks');
        dispatch({type:'GET_ALL_FEEDBACKS_SUCCESSFUL',payload:response.data})
    } catch (error) {
        dispatch({type:'GET_ALL_FEEDBACKS_FAILED',payload:error})
    }
}

export const submitFeedbackActions = (data)=> async(dispatch)=>{
    dispatch({type:'SUBMIT_FEEDBACK_REQUEST'});
    try {
        const response = await axios.post('/api/feedbacks/submitfeedback',{data})
        dispatch({type:'SUBMIT_FEEDBACK_SUCCESSFUL'});
    } catch (error) {
        dispatch({type:'SUBMIT_FEEDBACK_FAILED',payload:error})
    }
}