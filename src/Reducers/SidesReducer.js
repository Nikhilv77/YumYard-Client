export const getAllSidesReducer = (state={loading:false, Sides:[],error:false},action)=>{
    switch(action.type){
       case 'GET_ALL_SIDES_REQUEST':return{
           ...state,
           loading:true,
           error:null
       }
       case 'GET_ALL_SIDES_SUCCESSFUL':return{
           ...state,
           loading:false,
           Sides:action.payload,
           error:null
       }
       case 'GET_ALL_SIDES_FAILED':return{
           ...state,
           loading:false,
           error:action.payload
       }
       default :return state
    }
   }

   export const deleteSidesReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
    switch (action.type) {
      case "DELETE_SIDE_REQUEST":
        return {
          ...state,
         deleteLoading:true,
         success:false,
         deleteError:null
        };
      case "DELETE_SIDE_SUCCESS":
        return {
            ...state,
            deleteLoading: false,
            success: true,
            deleteError: null,
          
        };
      case "DELETE_SIDE_FAILED":
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

  export const addNewSideReducer = (state = { loading: false, success: false, error: null },action)=>{

    switch(action.type){
        case 'ADD_SIDE_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case "ADD_SIDE_SUCCESS":return{
            ...state,
            loading:false,
            success:true,
            error:null,
        }
        case"ADD_SIDE_FAILED":return{
            ...state,
            loading:false,
            success:false,
            error:action.payload,
        }
        default : return state;
    }
}

export const getSideByIdReducer = (state={Side:[],loading:false,error:null},action)=>{
  switch(action.type){
      case 'GET_SIDE_BYID_REQUEST':return{
          ...state,
          loading : true,
          error:null,
      }
      case 'GET_SIDE_BYID_SUCCESS':return{
          ...state,
          loading:false,
          Side:action.payload,
          error:null,
      }
      case "GET_SIDE_BYID_FAILED":return{
          ...state,
          loading:false,
          error:action.payload,
      }
      default :return state
  }
}

export const editSideReducer = (state = { editLoading: false, editSuccess: false, editError: null },action)=>{

  switch(action.type){
      case 'EDIT_SIDE_REQUEST':return{
          ...state,
          editLoading:true,
          editSuccess:false,
          editError:null
      }
      case "EDIT_SIDE_SUCCESS":return{
          ...state,
          editLoading:false,
         editSuccess:true,
         editError:null,
      }
      case"EDIT_SIDE_FAILED":return{
          ...state,
          editLoading:false,
         editSuccess:false,
          editError:action.payload,
      }
      default : return state;
  }
}

 