export const getAllIndianMealsReducer = (state={loading:false,Meals:[],error:false},action)=>{
    switch(action.type){
       case 'GET_ALL_INDIANMEALS_REQUEST':return{
           ...state,
           loading:true,
           error:null
       }
       case 'GET_ALL_INDIANMEALS_SUCCESSFUL':return{
           ...state,
           loading:false,
           Meals:action.payload,
           error:null
       }
       case 'GET_ALL_INDIANMEALS_FAILED':return{
           ...state,
           loading:false,
           error:action.payload
       }
       default :return state
    }
   }

   export const deleteIndianMealReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
    switch (action.type) {
      case "DELETE_INDIANMEAL_REQUEST":
        return {
          ...state,
         deleteLoading:true,
         success:false,
         deleteError:null
        };
      case "DELETE_INDIANMEAL_SUCCESS":
        return {
            ...state,
            deleteLoading: false,
            success: true,
            deleteError: null,
          
        };
      case "DELETE_INDIANMEAL_FAILED":
        return {
          ...state,
            deleteLoading: false,
            success: false,
            deleteError: action.payload,
        };
      default:
        return state; 
    }
  };
  export const addNewIndianReducer = (state = { loading: false, success: false, error: null },action)=>{

    switch(action.type){
        case 'ADD_INDIANMEAL_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case "ADD_INDIANMEAL_SUCCESS":return{
            ...state,
            loading:false,
            success:true,
            error:null,
        }
        case"ADD_INDIANMEAL_FAILED":return{
            ...state,
            loading:false,
            success:false,
            error:action.payload,
        }
        default : return state;
    }
}

export const getIndianMealByIdReducer = (state={IndianMeal:[],loading:false,error:null},action)=>{
  switch(action.type){
      case 'GET_INDIANMEAL_BYID_REQUEST':return{
          ...state,
          loading : true,
          error:null,
      }
      case 'GET_INDIANMEAL_BYID_SUCCESS':return{
          ...state,
          loading:false,
          IndianMeal:action.payload,
          error:null,
      }
      case "GET_INDIANMEAL_BYID_FAILED":return{
          ...state,
          loading:false,
          error:action.payload,
      }
      default :return state
  }
}

export const editIndianMealReducer = (state = { editLoading: false, editSuccess: false, editError: null },action)=>{

  switch(action.type){
      case 'EDIT_INDIANMEAL_REQUEST':return{
          ...state,
          editLoading:true,
          editSuccess:false,
          editError:null
      }
      case "EDIT_INDIANMEAL_SUCCESS":return{
          ...state,
          editLoading:false,
         editSuccess:true,
         editError:null,
      }
      case"EDIT_INDIANMEAL_FAILED":return{
          ...state,
          editLoading:false,
         editSuccess:false,
          editError:action.payload,
      }
      default : return state;
  }
}
