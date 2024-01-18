export const getAllBurgersReducer = (state={loading:false,Burgers:[],error:false},action)=>{
 switch(action.type){
    case 'GET_ALL_BURGERS_REQUEST':return{
        ...state,
        loading:true,
        error:null
    }
    case 'GET_ALL_BURGERS_SUCCESSFUL':return{
        ...state,
        loading:false,
        Burgers:action.payload,
        error:null
    }
    case 'GET_ALL_BURGERS_FAILED':return{
        ...state,
        loading:false,
        error:action.payload
    }
    default :return state
 }
}
export const deleteburgerReducer= (state = {deleteLoading: false, success: false, deleteError: null } , action) => {
    switch (action.type) {
      case "DELETE_BURGER_REQUEST":
        return {
          ...state,
         deleteLoading:true,
         success:false,
         deleteError:null
        };
      case "DELETE_BURGER_SUCCESS":
        return {
            ...state,
            deleteLoading: false,
            success: true,
            deleteError: null,
          
        };
      case "DELETE_BURGER_FAILED":
        return {
          ...state,
            deleteLoading: false,
            success: false,
            deleteError: action.payload,
        };
      default:
        return state; // No need to spread state here, just return the existing state
    }
  };

  export const addNewBurgerReducer = (state = { loading: false, success: false, error: null },action)=>{

    switch(action.type){
        case 'ADD_BURGER_REQUEST':return{
            ...state,
            loading:true,
            success:false,
            error:null
        }
        case "ADD_BURGER_SUCCESS":return{
            ...state,
            loading:false,
            success:true,
            error:null,
        }
        case"ADD_BURGER_FAILED":return{
            ...state,
            loading:false,
            success:false,
            error:action.payload,
        }
        default : return state;
    }
}

export const getBurgerByIdReducer = (state={Burger:[],loading:false,error:null},action)=>{
  switch(action.type){
      case 'GET_BURGER_BYID_REQUEST':return{
          ...state,
          loading : true,
          error:null,
      }
      case 'GET_BURGER_BYID_SUCCESS':return{
          ...state,
          loading:false,
          Burger:action.payload,
          error:null,
      }
      case "GET_BURGER_BYID_FAILED":return{
          ...state,
          loading:false,
          error:action.payload,
      }
      default :return state
  }
}

export const editBurgerReducer = (state = { editLoading: false, editSuccess: false, editError: null },action)=>{

  switch(action.type){
      case 'EDIT_BURGER_REQUEST':return{
          ...state,
          editLoading:true,
          editSuccess:false,
          editError:null
      }
      case "EDIT_BURGER_SUCCESS":return{
          ...state,
          editLoading:false,
         editSuccess:true,
         editError:null,
      }
      case"EDIT_BURGER_FAILED":return{
          ...state,
          editLoading:false,
         editSuccess:false,
          editError:action.payload,
      }
      default : return state;
  }
}
