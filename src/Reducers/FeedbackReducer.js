export const getAllFeedbacksReducer = (
    state = { Feedbacks: [], loading: false, error: null },
    action
  ) => {
    switch (action.type) {
      case "GET_ALL_FEEDBACKS_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "GET_ALL_FEEDBACKS_SUCCESSFUL":
        return {
          ...state,
          loading: false,
          Feedbacks: action.payload,
          error: null,
        };
      case "GET_ALL_FEEDBACKS_FAILED":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const submitFeedbackReducer = (state={loading:false,success:false,error:null},action)=>{
      switch(action.type){
          case 'SUBMIT_FEEDBACK_REQUEST':return{
              ...state,
              loading:true,
              success:false,
              error:null
          }
          case 'SUBMIT_FEEDBACK_SUCCESSFUL':return{
              ...state,
              loading:false,
              success:true,
              error:null
          }
          case 'SUBMIT_FEEDBACK_FAILED':return{
              ...state,
              loading:false,
              success:false,
              error:action.payload
          }
          default :return state
      }
  }
  