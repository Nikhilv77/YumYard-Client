export const getAllBevaragesReducer = (state={loading:false, Bevarages:[],error:false},action)=>{
    switch(action.type){
       case 'GET_ALL_BEVARAGES_REQUEST':return{
           ...state,
           loading:true,
           error:null
       }
       case 'GET_ALL_BEVARAGES_SUCCESSFUL':return{
           ...state,
           loading:false,
           Bevarages:action.payload,
           error:null
       }
       case 'GET_ALL_BEVARAGES_FAILED':return{
           ...state,
           loading:false,
           error:action.payload
       }
       default :return state
    }
   }

   export const deleteBevarageReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
    switch (action.type) {
      case "DELETE_BEVARAGE_REQUEST":
        return {
          ...state,
         deleteLoading:true,
         success:false,
         deleteError:null
        };
      case "DELETE_BEVARAGE_SUCCESS":
        return {
            ...state,
            deleteLoading: false,
            success: true,
            deleteError: null,
          
        };
      case "DELETE_BEVARAGE_FAILED":
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

  export const addNewBevarageReducer = (state = { loading: false, success: false, error: null },action)=>{

    switch(action.type){
        case 'ADD_BEVARAGE_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case "ADD_BEVARAGE_SUCCESS":return{
            ...state,
            loading:false,
            success:true,
            error:null,
        }
        case"ADD_BEVARAGE_FAILED":return{
            ...state,
            loading:false,
            success:false,
            error:action.payload,
        }
        default : return state;
    }
}

export const getBevarageByIdReducer = (state={Bevarage:[],loading:false,error:null},action)=>{
  switch(action.type){
      case 'GET_BEVARAGE_BYID_REQUEST':return{
          ...state,
          loading : true,
          error:null,
      }
      case 'GET_BEVARAGE_BYID_SUCCESS':return{
          ...state,
          loading:false,
          Bevarage:action.payload,
          error:null,
      }
      case "GET_BEVARAGE_BYID_FAILED":return{
          ...state,
          loading:false,
          error:action.payload,
      }
      default :return state
  }
}

export const editBevarageReducer = (state = { editLoading: false, editSuccess: false, editError: null },action)=>{

  switch(action.type){
      case 'EDIT_BEVARAGE_REQUEST':return{
          ...state,
          editLoading:true,
          editSuccess:false,
          editError:null
      }
      case "EDIT_BEVARAGE_SUCCESS":return{
          ...state,
          editLoading:false,
         editSuccess:true,
         editError:null,
      }
      case"EDIT_BEVARAGE_FAILED":return{
          ...state,
          editLoading:false,
         editSuccess:false,
          editError:action.payload,
      }
      default : return state;
  }
}

 