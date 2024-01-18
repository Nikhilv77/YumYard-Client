export const donationReducer = (state = { loading: false, success: false, error: null } , action) => {
    switch (action.type) {
      case "DONATION_REQUEST":
        return {
          ...state,
            loading: true,
            success: false,
            error: null,
          
        };
      case "DONATION_SUCCESSFUL":
        return {
          ...state,
            loading: false,
            success: true,
            error: null,
          
        };
      case "DONATION_FAILED":
        return {
          ...state,
            loading: false,
            success: false,
            error: action.payload,
          
        };
      default:
        return state; // No need to spread state here, just return the existing state
    }
  };

  export const getAllDonationsReducer = (state={Donations : []},action)=>{
    switch(action.type){
      case'GET_ALL_DONATIONS_REQUEST':return{
        ...state,
        loading:true,
        error:null,
      }
      case 'GET_ALL_DONATIONS_SUCCESS':return{
        ...state,
        loading:false,
        error:null,
        Donations : action.payload
      }
      case 'GET_ALL_DONATIONS_FAILED':return{
        ...state,
        loading:false,
        error:action.payload,
      }
      default : return state
    }
  }

  
export const sessionDonationReducer = (state = { loading: false, success: false, error: null } , action) => {
  switch (action.type) {
    case "SAVE_DONATION_REQUEST":
      return {
        ...state,
          loading: true,
          success: false,
          error: null,
        
      };
    case "SAVE_DONATION_SUCCESSFUL":
      return {
        ...state,
          loading: false,
          success: true,
          error: null,
        
      };
    case "SAVE_DONATION_FAILED":
      return {
        ...state,
          loading: false,
          success: false,
          error: action.payload,
        
      };
    default:
      return state; // No need to spread state here, just return the existing state
  }
};

